import React, {Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default class SetSwiper extends Component {
  render () {
    return <div className="swiper-container" ref='container'>
      <div className="swiper-wrapper">
        {
          this.props.children
        }
      </div>
      {
        this.props.pagination && <div className="swiper-pagination"></div>
      }
  </div>
  }
  componentDidMount () {
    const {pagination, direction} = this.props
    new Swiper (this.refs.container, {
      loop: true,
      // 如果需要分页器
      pagination: {
        el: this.props.pagination ? '.swiper-pagination' : '',
        clickable: true
      },
      autoplay: {
        autoplay: true,
        delay: 1000
      },
      direction: direction
    })        
  }
}