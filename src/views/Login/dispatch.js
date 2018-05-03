import {SAVE_USER_INFO} from '../../store/reducers'
import $http from '../../utils/$http'

export default function mapDispatch (dispatch) {
  return {
    saveUserInfo (tel, pwd, from, history) {
      $http.post('/user/login', {tel, pwd}).then(data => {
        if (data.code === 1) {
          const path = from ? from : '/index/home'
          document.cookie =  'token=' + data.token
          dispatch({
            type: SAVE_USER_INFO,
            info: {
              tel: data.info.tel,
              username: data.info.username
            }
          })
          history.push(path)
        } else {
          alert(data.info)
        }
      })
    }
  }
}