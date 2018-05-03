// 当前环境
// console.log(process.env.NODE_ENV)
// 基础配置
const cwd = process.cwd()
// cwd() 是当前执行node命令时候的文件夹地址 
// __dirname 是被执行的js 文件的地址
module.exports = {
  entry: {
    bundle: cwd + '/src/main.js'
  },
  output: {
    path: __dirname + '../dist',
    filename: "[name].js"
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.(svg|png|jpg|gif|eot|woff|ttf)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': __dirname + '/dist'
    }
  }
}