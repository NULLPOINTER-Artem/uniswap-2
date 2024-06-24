const { override, addWebpackAlias } = require('customize-cra')

module.exports = override(
    addWebpackAlias({
        "path": require.resolve("path-browserify"),
        fs: false,
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "assert": require.resolve("assert/"),
    })
)