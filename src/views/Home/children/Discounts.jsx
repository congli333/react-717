import React, {Component} from 'react'
import Swiper from '../../../components/Swiper'

export default class Discounts extends Component {
  render () {
    return <div className='home-discounts'>
      <span>商城动态</span>
      <Swiper direction='vertical'>
        <p className='swiper-slide'>
          717商城社区服务功能正式上线！抢红包！晒家乡 好吃、好看、好玩尽在717商城社区
        </p>
        <p className='swiper-slide'>
          717安全食品商城周年庆，暑期放假啃不停 
        </p>
      </Swiper>
    </div>
  }
}