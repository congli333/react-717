// 其他的公用工具
// 获取cookies 存储
function getCookie (name) {
  let cookieStr = document.cookie
  if (cookieStr.length === 0) return;
  let arr;
  let res = null;
  // 有多个
  if (cookieStr.indexOf(';') > -1) {
    arr = cookieStr.split('; ')
    arr.forEach((cookie, index) => {
      let tmp_arr = cookie.split('=')
      if (tmp_arr[0] == name) {
        res = tmp_arr[1]
      }
    })
  } 
  // 只有一个
  else {
    let tmp_arr = cookieStr.split(';')
    if (tmp_arr[0] === name) {
      res = tmp_arr[1]
    }
  }
  return res
}
function delCookie(name)  
{  
  var exp = new Date();  
  exp.setTime(exp.getTime() - 1);  
  var cval=getCookie(name);  
  if(cval!=null)  
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
}
export {getCookie, delCookie}