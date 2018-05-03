// 请求的接口文件
const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

/* function queryApi(url,methods,params){
  return new Promise((resolve,reject)=>{
      //请求远端商品列表数据
      const options = {
          hostname: 'www.lb717.com',//域名
          port: 80,
          path: url,
          method: methods,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      //商品列表的接口
      let data = "";
      let request = http.request(options, (response) => {//获取远端数据
          response.setEncoding('utf8');
          response.on('data', (chunk) => {
              data += chunk
          });
          response.on('end', () => {//返回前端商品列表数据
              resolve(JSON.stringify(data))
          });
      })
      if (methods.toLowerCase() == "post") {
          request.write(querystring.stringify(params))//传的参数
      }
      request.end()
  })
} */
module.exports = (app) => { 
  // 导航列表数据
  app.get('/api/list', (req, res) => {
    const list = require('./navList.json')
    res.json(JSON.stringify(list))
  })
  // getaddrinfo ENOTFOUND表示客户端无法连接到给定的地址。请尝试指定没有http的主机：
  /* const options = {
    hostname: 'http://www.lb717.com',
    port: 80,
    path: '/mall/index/getGoodsChannel',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }; */
  // 商品列表
  /* app.post('/mall/index/getGoodsChannel', (req, res) => {
    queryApi("/mall/index/getGoodsChannel","post",req.body)
    .then((data)=>{
      res.send({
        code: 1,
        data: data
      })
    })
  }) */
  // 营业商品列表的数据
  app.post('/mall/index/getGoodsChannel', (req, res) => {
    const goods = require('./goods.json').list
    const {channel_id, nums} = req.body
    // 处理数据
    let goods_list = _.chunk(goods, nums)
    let msg = {}
    // 判断是否还有数据
    if (channel_id > goods_list.length) {
      msg = {
        code: 0,
        msg: []
      }
    } else {
      msg = {
        code: 1,
        msg: goods_list[channel_id-1]
      }
    }
    res.send(msg)
  })
  // 分类的数据 
  app.get('/mall/category/topCategory', (req, res) => {
    const id = querystring.parse(req.url.slice(req.url.indexOf('?')+1)).cate_id
    const classifyList = require('./classifyList.json').classifyList
    res.send(classifyList[id])
  })
  // 登录
  app.post('/user/login', (req, res) => {
    const user = fs.readFileSync('server/user.json', {encoding: 'utf-8'})
    const loginObj = req.body
    const resInfo = {
      code: 0,
      info: '密码或者手机号错误',
      token: ''
    }
    // 判断用户名是否存在，切密码是否正确
    JSON.parse(user).map(v => {
      if (v.tel == loginObj.tel && v.pwd == loginObj.pwd) {
        resInfo.code = 1;
        resInfo.info = '登陆成功'
      }
    })
    // 若成功登陆，加密
    if (resInfo.code === 1) {
      // jsonwebtoken
      resInfo.token = jwt.sign(loginObj, 'lucy', {expiresIn: '2h'})
    }
    res.send(resInfo)
  })
  // 注册
  app.post('/user/register', (req, res) => {
    let user = fs.readFileSync('server/user.json', {encoding: 'utf-8'})
    const body = req.body
    user = JSON.parse(user)
    // 判断手机号，密码的规范
    const resInfo = {
      code: 0,
      info: ''
    }
    let grade = 0
    const telReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
    const pwdReg1 = /\d+/ig
    const pwdReg2 = /(a-z|A-Z)+/ig
    const pwdReg3 = /(\.|\@|\&|\*)+/g
    // 判断是否有同样的用户一经注册
    for (let i=0;i<user.length; i++) {
      if (user[i].tel == body.tel) {
        resInfo.info = '该用户名已经注册过了，请重新输入'
      }
    }
    // 判断是否满足格式
    if (!resInfo.info) {
      if (telReg.test(body.tel)) {
        if (pwdReg1.test(body.pwd)) grade++;
        if (pwdReg2.test(body.pwd)) grade++;
        if (pwdReg3.test(body.pwd)) grade++;
        if (grade == 0) {
          resInfo.info = '密码格式错误'
        } else {
          resInfo.code = 1
          user = [...user, body]
          fs.writeFileSync('server/user.json', JSON.stringify(user))
          resInfo.info = `注册成功，密码等级${grade}`
        }
      } else {
        resInfo.info = '手机号格式错误'
      }
    }
    res.send(resInfo)
  })
  // 添加购物车
  app.post('/user/addCart', (req, res) => {
    const {token, goods} = req.body
    let cart_goods = JSON.parse(fs.readFileSync('server/cart_goods.json', {encoding: 'utf-8'}))
    if (token) {
      jwt.verify(token, 'lucy', (err, decoded) => {
        if (err) {
          res.json(JSON.stringify({
            code: 0,
            info: '登录超时'
          }))
        } else {
          let userCartGoods = cart_goods[decoded.tel]
          // 判断是否有该属性
          if (userCartGoods) {
            let isRepeat = false
            // 判断该商品是否已经存在
            userCartGoods.map(v => {
              if (v.key == goods.key) {
                ++v.count
                isRepeat = true
              }
            })
            // 不存在添加count和selected
            if (!isRepeat) {
              goods.count = 1
              goods.selected = false
            }
            userCartGoods = isRepeat ? userCartGoods : [...userCartGoods, goods]
          } else {
            // 添加基础的count和select
            goods.count = 1
            goods.selected = false
            userCartGoods = [goods]
          }
          cart_goods[decoded.tel] = userCartGoods
          fs.writeFileSync('server/cart_goods.json', JSON.stringify(cart_goods))
          res.json(JSON.stringify({
            code: 1,
            cart_goods: cart_goods[decoded.tel]
          }))
        }
      })
    } else {
      res.json(JSON.stringify({
        code: 0,
        msg: '还没有登陆，请先登录'
      }))
    }
  })
  // 获取购物车内容
  app.post('/user/getCartGoods', (req, res) => {
    const token = req.body.token
    if (token) {
      jwt.verify(token, 'lucy', (err, decoded) => {
        if (err) {
          res.send({
            code: 0,
            info: '登录超时，请重新登陆'
          })
        } else {
          const cart_goods = JSON.parse(fs.readFileSync('server/cart_goods.json', {encoding: 'utf-8'}))
          res.send({
            code: 1,
            data: cart_goods[decoded.tel] ? cart_goods[decoded.tel] : []
          })
        }
      })
    } else {
      res.send({
        code: 0,
        info: '还未登陆'
      })
    }
  })
  // 更新购物车
  app.post('/user/updataCart', (req, res) => {
    const {token, id, count} = req.body
    const cart_goods = JSON.parse(fs.readFileSync('server/cart_goods.json', {encoding: 'utf-8'}))
    jwt.verify(token, 'lucy', (err, decoded) => {
      if (err) {
        res.send({
          code: 0,
          info: '登录超时'
        })
      } else {
        cart_goods[decoded.tel].map(v => {
          if (v.key == id) {
            v.count = count;
          }
        })
        fs.writeFileSync('server/cart_goods.json', JSON.stringify(cart_goods))
        res.send({
          code: 1,
          data: cart_goods[decoded.tel]
        })
      }
    })
  })
  // 删除购物车商品
  app.post('/user/delCartGood', (req, res) => {
    const {token, ids} = req.body
    jwt.verify(token, 'lucy', (err, decoded) => {
      if (err) {
        res.send({
          code: 0,
          info: '登录失效，请重新登陆'
        })
      } else {
        const cart_goods = JSON.parse(fs.readFileSync('server/cart_goods.json', {encoding: 'utf-8'}))
        let goods = cart_goods[decoded.tel]
        ids.map(item => {
          const delId = _.remove(goods, (v) => {
            return v.key == item
          })
        })
        cart_goods[decoded.tel] = goods
        fs.writeFileSync('server/cart_goods.json', JSON.stringify(cart_goods))
        res.send({
          code: 1,
          info: '删除成功',
          data: cart_goods[decoded.tel]
        })
      }
    })
  })
  // 热门推荐的数据
  app.get('/user/getHotRecommend', (req, res) => {
    const goods = require('./goods.json').list
    // 处理数据
    let goods_list = _.chunk(goods, 20)
    res.send({
      data: goods_list[0]
    })
  })
  // 更新当前用户信息
  app.post('/user/updateUserInfo', (req, res) => {
    const {oldTel, newTel} = req.body
    const userData = JSON.parse(fs.readFileSync('server/user.json', {enciding: 'utf-8'}))
    let info = {}
    const telReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
    if (!telReg.test(newTel)) {
      res.send({
        code: 0,
        info: '电话的格式错误'
      })
    } else {
      userData.map(v => {
        if (v.tel == oldTel) {
          v.tel = newTel
          info.tel = v.tel
          info.username = v.username
        }
      })
      fs.writeFileSync('server/user.json', JSON.stringify(userData))
      res.send({
        code: 1,
        info
      })
    }
  })
  // 获取用户信息
  app.post('/user/getUserInfo', (req, res) => {
    const {token} = req.body
    const userData = JSON.parse(fs.readFileSync('server/user.json', {encoding: 'utf-8'}))
    jwt.verify(token, 'lucy', (err, decoded) => {
      if (err) {
        res.send({
          code: 0,
          info: '登陆过期，请重新登陆'
        })
      } else {  
        userData.map(v => {
          if (v.tel == decoded.tel) {
            res.send({
              code: 1,
              info: {
                tel: v.tel,
                username: v.username
              }
            })
          }
        })
      }
    })
  })
}