export default function mapState (state) {
  const {cart_goods} = state
  // 计算总计，是否全选
  let total = 0;
  let selectall = true
  cart_goods.map(v => {
    if (v.selected) {
      total += v.goods_price*v.count
    } else {
      selectall = false
    }
  })
  return {
    cart_goods,
    selectall,
    total: total.toFixed(2)
  }
}