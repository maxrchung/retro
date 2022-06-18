import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export class RetroStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    new dynamodb.Table(this, 'retro-table', {
      tableName: 'retro-table',
      pointInTimeRecovery: true,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    })
  }
}
