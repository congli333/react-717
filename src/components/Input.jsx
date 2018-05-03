import React, {Component} from 'react'

export default class Input extends Component {
  constructor () {
    super()
    this.state = {
      val: ''
    }
  }
  // 受控组件的值
  changeVal (e) {
    this.setState({
      val: e.target.value
    })
  }
  getFocus () {
    const {focus} = this.props
    focus && focus()
  }
  render () {
    const {val} = this.state
    const {focus} = this.props
    return <p className='search-inp'>
      <input type='text' placeholder='请输入您要购买的商品' value={val} onChange={this.changeVal.bind(this)} onFocus={this.getFocus.bind(this)}/>
      <i className='icon iconfont icon-sousuo'></i>
    </p>
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      val: nextProps.val ? '' : this.state.val
    })
  }
}