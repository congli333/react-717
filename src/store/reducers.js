import {combineReducers} from 'redux'

// 更新购物车，添加，更新数据，删除 // 都会返回到服务器管理
export const UPDATE_CART= 'UPDATE_CART'
// 更新数据加减
export const UPDATE_GOOD_COUNT = 'UPDATE_GOOD_COUNT'
// 设置选中
export const UPDATE_GOODS_SELECTED = 'UPDATA_GOODS_SELECTED'
// 全选
export const SELECTED_ALL = 'SELECTED_ALL'
// 用户信息存储
export const SAVE_USER_INFO = 'SAVE_USER_INFO'
// 更新用户信息
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

const init_state = {
  carts: [],
  userInfo: {}
}
function cart_goods (state=init_state.carts, action) {
  switch (action.type) {
    case UPDATE_CART:
      // 判断购物车中该商品是否已经存在
      return action.data;
      break;
    case UPDATE_GOOD_COUNT:
      const goods1 = state
      const {key, count} = action.data.count
      goods1.map(v => {
        if (v.key == key) {
          v.count = count
        }
      })
      return goods1
      break;
    case UPDATE_GOODS_SELECTED: 
      state.map(v => {
        if (v.key == action.id) {
          v.selected = !v.selected
        }
      })
      return state
      break;
    case SELECTED_ALL:
      const goods = [...state]
      goods.map(v => {
        v.selected = action.flag
      })
      return goods;
      break;
    default: return state
  }
}
function save_user_info (state=init_state.userInfo, action) {
  switch (action.type) {
    case SAVE_USER_INFO:
      return action.info
      break
  }
  return state
}
export default combineReducers({
  cart_goods,
  save_user_info
})