import {UPDATE_CART} from '../../../store/reducers'
import $http from '../../../utils/$http'
import {getCookie} from '../../../utils/utils'
import {T} from 'react-toast-mobile'

export default function mapDispatch (dispatch) {
  return {
    addCart (history, goods_info) {
      $http.post('/user/addCart', {token: getCookie('token'), goods: goods_info}).then(res => {
        const data = JSON.parse(res)
        if (data.code == 0) {
          history.push('/login')
        } else {
          console.log('添加购物车成功')
          dispatch({
            type: UPDATE_CART,
            data: data.cart_goods
          })
        }
      })
    }
  }
}