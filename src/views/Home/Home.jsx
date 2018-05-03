import React, {Component, Fragment} from 'react'
import Swiper from '../../components/Swiper'
import $http from '../../utils/$http'
import NavList from './children/NavList'
import BanSwiper from './children/BanSwiper'
import Discounts from './children/Discounts'
import Goods from '../../components/Goods'
import Input from '../../components/Input'
import './home.scss'

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      navlist: [], // 导航列表
      goods_list: [], // 商品列表
      channel_id: 1, // 请求数据的id
      nums: 10, // 每次请求的条数
      flag: true // 是否可以请求数据
    }
  }
  render () {
    const {navlist, goods_list} = this.state
    return <Fragment>
      <div className='home-header'>
        <span>717</span>
        <Input focus={this.focus.bind(this)}/>
        <span>
          <i className='icon iconfont icon-shop'></i>
          <b>我的店铺</b>
        </span>
      </div>
      <div className='home-main' ref='home_scroll' onScroll={this.scroll.bind(this)}>
        {/* banner轮播图 */}
        <Swiper pagination={true} direction='horizontal'>
          <BanSwiper/>
        </Swiper>
        <NavList list = {navlist}/>
        <Discounts />
        <Goods goods_list={goods_list} history={this.props.history} from='/index/home'/>
      </div>
    </Fragment>
  }
  // main滚动式加载数据
  scroll() {
    const {channel_id, nums, goods_list, flag} = this.state
    const {scrollTop, scrollHeight, offsetHeight} = this.refs.home_scroll
    const difference = scrollHeight-offsetHeight-scrollTop
    if (difference < 5 && flag) {
      $http.post('/mall/index/getGoodsChannel', {channel_id: channel_id+1, nums: 10}).then(data => {
        if (data.code === 1) {
          console.log('加载')
          this.setState({
            channel_id: channel_id+1,
            goods_list: [...goods_list, ...data.msg]
          })
        } else {
          this.setState({
            flag: false
          })
          console.log('没有更多数据')
        }
      })
    } 
  }
  // 获取焦点是跳转路径
  focus () {
    this.props.history.push('/search/index', {from: this.props.match.path})
  }
  componentDidMount () {
    const {channel_id, nums} = this.state
    // nav列表
    $http.get('/api/list').then(data => {
      this.setState({
        navlist: JSON.parse(data)
      })
    })
    // 商品列表
    $http.post('/mall/index/getGoodsChannel', {channel_id: 1, nums: 10}).then(data => {
      if (data.code === 1) {
        this.setState({
          goods_list: data.msg
        })
      }
    })
  }
}