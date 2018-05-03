// 服务器
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = require('./api.js')

app.use(bodyParser.json())

// 跨域请求头
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

port(app)
app.listen(3000, () => console.log('port is 3000 ......'))