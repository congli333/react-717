// http
/* 
* @argument get
* @argument post
*/
// 本地测试服务器的域名
let domin = ''
domin = 'http://localhost:9090'
/* if (process.env == 'development') {
  domin = 'http://localhost:3000'
} else if (process.env == 'production') {
  domin = 'www.lb717.com'
} */
export default {
  get (url, data) {
    console.log('get')
    // 判断data为对象
    if (Object.prototype.toString.call(data) != '[object Object]' && data != undefined) {
      return {
        then (callback) {
          callback('入参格式错误')
          return {
            catch (err) {
              err(new Error('入参格式错误'))
            }
          }
        }
      }
    }
    // 拼接字符串，url
    let queryString = '?'
    if (data != undefined) {
      for (let key in data) {
        queryString += key + '=' + data[key] + '&'
      }
      url = (url + queryString).slice(0, -1)
    }
    // 编码 汉字
    url = domin + url
    console.log(url)
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'GET'
    }).then(res => res.json())
  },
  post (url, data) {
    // 判断data为对象
    if (Object.prototype.toString.call(data) != '[object Object]' && data != undefined) {
      return {
        then (callback) {
          callback('入参格式错误')
          return {
            catch (err) {
              err(new Error('入参格式错误'))
            }
          }
        }
      }
    }
    url = domin + url
    return fetch(url, { 
      body:JSON.stringify(data), // 传递数据 必须在headers上添加content-type字段
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(res => res.json())
  },
  // json话语封装
  // 原理 动态创建scrip标签，调价到body中，指定src路径，定义callback接收数据
  // callback必须在调用之前定义
  jsonp (url) {
    // 获取callback的名称， 在url中 解析url
    
    return new Promise((resolve, reject) => {
      // 需要在添加进script标签前，创建callback函数
      window[callback] = (data) => {
        resolve(data)
      } 
      // 创建script标签
      const script = document.createElement('script')
      const body = document.body
      script.src = url
      body.appendChild(script)
    })
  }
}