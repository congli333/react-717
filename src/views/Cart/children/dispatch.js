import $http from '../../../utils/$http'
import {getCookie} from '../../../utils/utils'
import {UPDATE_CART, UPDATE_GOODS_SELECTED, UPDATE_GOOD_COUNT} from '../../../store/reducers'

export default function mapDispatch (dispatch) {
  return {
    updateGoodCount (goods, history) {
      $http.post('/user/updataCart', {token: getCookie('token'), id: goods.key, count: goods.count}).then(res => {
        const {code, data} = res
        if (code == 0) {
          console.log('更新失败')
          history.push('/login')
        } else {
          dispatch({
            type: UPDATE_GOOD_COUNT,
            data: goods
          })
        }
      })
    },
    selectedGood (goods_id) {
      dispatch({
        type: UPDATE_GOODS_SELECTED,
        id: goods_id
      })
    }
  }
}