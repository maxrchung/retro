import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as amplify from '@aws-cdk/aws-amplify-alpha'
import * as core from 'aws-cdk-lib'
import * as ssm from 'aws-cdk-lib/aws-ssm'
import * as codebuild from 'aws-cdk-lib/aws-codebuild'

export class RetroStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    new dynamodb.Table(this, 'retro-table', {
      tableName: 'retro-table',
      pointInTimeRecovery: true,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    })

    const amplifyApp = new amplify.App(this, 'retro-amplify', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'maxrchung',
        repository: 'retro',
        oauthToken: core.SecretValue.plainText(
          ssm.StringParameter.valueForStringParameter(
            this,
            'github-personal-access-token'
          )
        )
      }),
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        appRoot: 'frontend',
        frontend: {
          phases: {
            preBuild: {
              commands: ['yarn']
            },
            build: {
              commands: ['yarn export']
            }
          },
          artifacts: {
            baseDirectory: 'out',
            files: ['**/*']
          },
          cache: {
            paths: ['node_modules/**/*', '../node_modules/**/*']
          }
        }
      }),
      // Setting up rewrite rules for NextJS: https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/#dynamic-routes
      customRules: [
        {
          source: '/<*>',
          target: '/[id].html',
          status: amplify.RedirectStatus.REWRITE
        }
      ]
    })
    const branch = amplifyApp.addBranch('main')
    const domain = amplifyApp.addDomain('maxrchung.com')
    domain.mapSubDomain(branch, 'retro')
  }
}
