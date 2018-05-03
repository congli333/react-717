import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import mapState from './state'
import mapDispatch from './dispatch'
import CartItem from './children/CartItem'
import Recommend from '../../components/Recommend'
import './cart.scss'

class Cart extends Component {
  constructor () {
    super()
    this.state = {
      isCompile: false // 是否编辑
    }
  }
  render () {
    const {cart_goods, history, total, selectall, selectedAll} = this.props
    const {isCompile} = this.state
    return <Fragment>
      <div className='cart-header'>
        <i className='icon iconfont icon-xiangzuo' onClick={this.back.bind(this)}></i>
        <span>购物车</span>
        <i onClick={this.compileCart.bind(this)}>{isCompile ? '完成' : '编辑'}</i>
      </div>
      <div className='cart-main'>
        {
          (cart_goods && cart_goods.length > 0) ? <ul className='cart-goods'>
            {
              cart_goods.map(v => {
                return <CartItem key={v.key} goods_info={v} history={history}/>
              })
            }
          </ul>  : <div><p>购物车还是空的哦！！快逛逛吧</p><button onClick={this.toStroll.bind(this)}>去逛逛</button></div>
        }
        <Recommend />
      </div>
      <div className='cart-footer'>
        <span>
          <b className={selectall ? 'select-box selected' : 'select-box'} onClick={this.selectedAll.bind(this)}>
            {selectall && <i className='icon iconfont icon-yes'></i>}
          </b>
          <b>全选</b>
        </span>
        <span>合计：<i>￥{total}</i></span>
        <button onClick={this.delAndSet.bind(this)}>{isCompile ? '删除' : `结算(${0})`}</button>
      </div>
    </Fragment>
  }
  back () {
    const {history, location} = this.props
    history.push(location.state ? location.state.from : '/index/home')
  }
  // 全选
  selectedAll () {
    this.props.selectedAll(!this.props.selectall)
  }
  // 编辑页面
  compileCart () {
    this.setState({
      isCompile: !this.state.isCompile
    })
  }
  // 
  toStroll () {
    this.props.history.push('/index/home')
  }
  // 结算或者删除 
  delAndSet () {
    const {isCompile} = this.state
    const {cart_goods, delGood} = this.props
    const ids = []
    if (isCompile) {
      cart_goods.map(v => {
        v.selected && ids.push(v.key)
      })
      delGood(ids)
    } else {
      console.log('结算')
    }
  }
  componentDidMount () {
    const {history, fetchGetGoods, cart_goods} = this.props
    fetchGetGoods(history)
  }
}



export default connect(mapState, mapDispatch, null, {pure: false})(Cart)
