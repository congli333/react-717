import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'

export default class Footer extends Component {
  render () {
    const foots = [
      {
        path: '/index/home',
        name: 'home',
        text: '首页',
        icon: 'icon-shouye1'
      }, {
        path: '/index/classify',
        name: 'classify',
        text: '分类',
        icon: 'icon-fenlei'
      }, {
        path: '/index/cart',
        name: 'cart',
        text: '购物车',
        icon: 'icon-gouwuche1'
      }, {
        path: '/index/mine',
        name: 'mine',
        text: '我的',
        icon: 'icon-weibiaoti2fuzhi12'
      }
    ]
    return <div className='footer'>
      {
        foots.map(v => {
          return <NavLink activeClassName='cur' to={v.path} key={v.name}>
            <i className={'icon iconfont ' + v.icon}></i>
            <span>{v.text}</span>
          </NavLink>
        })
      }
    </div>
  }
}