import {SAVE_USER_INFO} from '../../store/reducers'
import $http from '../../utils/$http'
import {getCookie} from '../../utils/utils'

export default function mapDispatch (dispatch) {
  return {
    updateTel (oldTel, newTel, history) {
      $http.post('/user/updateUserInfo', {token: getCookie('token'), oldTel, newTel}).then(data => {
        const {code, info} = data
        if (code == 0) {
          console.log(info)
        } else {
          console.log('修改成功')
          dispatch({
            type: SAVE_USER_INFO,
            info: info
          })
          history.push('/setting/index')
        }
      })
    }
  }
}