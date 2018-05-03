import React, {Component} from 'react'
import {connect} from 'react-redux'
import mapDispatch from './dispatch'

class CartItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: props.goods_info.selected
    }
  }
  render () {
    const {goods_info} = this.props
    return <li className='goods-item'>
      <span className={goods_info.selected ? 'select-box selected' : 'select-box'} onClick={this.selectGood.bind(this)}>
        {goods_info.selected && <i className='icon iconfont icon-yes'></i>}
      </span>
      <dl>
        <dt><img src={goods_info.goods_img}/></dt>
          <dd>
            <p>{goods_info.goods_name}</p>
            <div>
              <p className='left'>
                <i>×{goods_info.count}</i>
                <span>￥<b>{goods_info.goods_price}</b></span>
              </p>
              <p className='right'>
                <i onClick={this.updataCart.bind(this, 'reduce')}>-</i>
                <span>{goods_info.count}</span>
                <i onClick={this.updataCart.bind(this, 'increase')}>+</i>
              </p>
            </div>
          </dd>
      </dl>
    </li>
  }
  // 更新购物车
  updataCart (type, e) {
    e.stopPropagation()
    const {goods_info, history, updateGoodCount} = this.props
    const goods = goods_info;
    type == 'reduce' && goods.count == 1 ? goods.count = 2 : null
    type == 'reduce' ? --goods.count : ++goods.count
    updateGoodCount(goods, history)
  }
  selectGood (e) {
    e.stopPropagation()
    const {goods_info, selectedGood} = this.props
    selectedGood(goods_info.key)
  }
}
export default connect(null, mapDispatch, null, {pure: false})(CartItem)