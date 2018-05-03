// development 模式
const webpack = require('webpack')
const baseConfig = require('./webpack.base.js')
baseConfig.plugins.push(new webpack.DefinePlugin({
  "process.env": '"development"' // "development"会被解析为变量，所以需要用两层引号
}))
module.exports = {
  ...baseConfig,
  devServer: {
    historyApiFallback: true,
    port: 9090,
    noInfo: true,
    inline: true
  },
  devtool: 'eval-source-map'
}