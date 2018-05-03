import React, {Component, Fragment} from 'react'
import Recommend from '../../components/Recommend'
import portrait from '../../static/img/static_portrait.png'
import './mine.scss'


export default class Mine extends Component {
  constructor () {
    super()
    this.state = {
      isShowFix: false
    }
  }
  render () {
    const {isShowFix} = this.state
    return <Fragment>
      <div className='mine-main' ref='mine_scroll' onScroll={this.scroll.bind(this)}>
        <div className='mine-header'>
          <h3 className={isShowFix ? 'head-tit fix-box' : 'head-tit'} ref='mine_header'>
            <i className='icon iconfont icon-shezhi' onClick={this.toSet.bind(this)}></i>
            <span>我的</span>
            <i className='icon iconfont icon-buoumaotubiao14'></i>
          </h3>
          <div>
            <img src={portrait}/>
            <p>25235235262</p>
          </div>
        </div>
        <ul>
          <li>
            <i className='icon iconfont icon-shouhoutuikuan'></i>
            <p>
              <span>账户余额</span>
              <i className='icon iconfont icon-xiangyou'></i>
            </p>
          </li>
          <li>
            <i className='icon iconfont icon-ziyuan1'></i>
            <p>
              <span>地址管理</span>
              <i className='icon iconfont icon-xiangyou' onClick={this.toDeveryList.bind(this)}></i>
            </p>
          </li>
          <li>
            <i className='icon iconfont icon-biaoqian'></i>
            <p>
              <span>我的客服</span>
              <i className='icon iconfont icon-xiangyou'></i>
            </p>
          </li>
        </ul>
        <Recommend />
      </div>
    </Fragment>
  }
  scroll () {
    // 滚动距离
    const scrollTop = this.refs.mine_scroll.scrollTop
    // 头部的高度
    const headerH = this.refs.mine_header.offsetHeight
    this.setState({
      isShowFix: scrollTop > headerH
    })
  }
  toSet () {
    this.props.history.push('/setting/index', {from: '/index/mine'})
  }
  // 地址管理
  toDeveryList () {
    this.props.history.push('/deveryList')
  }
}