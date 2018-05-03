// production 生产模式
const webpack = require('webpack')
const baseConfig = require('./webpack.base.js')
baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
baseConfig.plugins.push(new webpack.DefinePlugin({
  "process.env": '"production"'
}))
module.exports = {
  ...baseConfig
}