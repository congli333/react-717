import React, {Component} from 'react'
import LazyLoad from 'react-lazyload'
import Loading from '../../Loading'
import {connect} from 'react-redux'
import mapDispatch from './dispatch'

class GoodsItem extends Component {
  render () {
    const {goods_name, goods_img, goods_price} = this.props.goods_info
    return <dl>
      <dt onClick={this.toDetail.bind(this)}>
        <LazyLoad height={'100%'} once placeholder={<Loading />} overflow debounce={200}>
          <img src={goods_img} />
        </LazyLoad>
      </dt>
      <dd>
        <h5 onClick={this.toDetail.bind(this)}>{goods_name}</h5>
        <p>
          <span>￥{goods_price}</span>
          <span>
            <i className='icon iconfont icon-gouwuche1' onClick={this.addCart.bind(this)}></i>
            <b>+</b>
          </span>
        </p>
      </dd>
    </dl>
  }
  // 添加到购物车
  addCart (e) {
    e.stopPropagation()
    const {history, from, goods_info, addCart} = this.props
    addCart(history, goods_info)
  }
  // 去详情页
  toDetail () {
    const {goods_name, goods_img, goods_price} = this.props.goods_info
    this.props.history.push('/detail', {info: goods_name, img: goods_img, from: '/index/home'})
  }
}

export default connect(null, mapDispatch)(GoodsItem)
