import {UPDATE_CART, SELECTED_ALL} from '../../store/reducers' 
import {getCookie} from '../../utils/utils'
import $http from '../../utils/$http'

export default function mapDispatch (dispatch) {
  return {
    // 获取购物车数据
    fetchGetGoods (history) {
      $http.post('/user/getCartGoods', {token: getCookie('token')}).then(res => {
        if (res.code == 1) {
          dispatch({
            type: UPDATE_CART,
            data: res.data
          })
        } else if (res.code == 0) {
          history.push('/login')
        }
      })
    },
    // 删除商品
    delGood (ids) {
      console.log(ids)
      $http.post('/user/delCartGood', {token: getCookie('token'), ids: ids}).then(res => {
        dispatch({
          type: UPDATE_CART,
          data: res.data
        })
      })
    },
    // 全选
    selectedAll (flag) {
      dispatch({
        type: SELECTED_ALL,
        flag: flag
      })
    }
  }
}