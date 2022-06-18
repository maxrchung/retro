const path = require('path')

// https://github.com/vercel/next.js/pull/22867
module.exports = {
  experimental: {
    externalDir: true,
    outputStandalone: true,
    // https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
    outputFileTracingRoot: path.join(__dirname, '../')
  }
}
