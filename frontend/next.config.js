// https://github.com/vercel/next.js/pull/22867
module.exports = {
  experimental: {
    externalDir: true
  },
  // https://react-svgr.com/docs/next/#usage
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
