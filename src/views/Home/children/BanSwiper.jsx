import React, {Component, Fragment} from 'react'
import ban1 from '../../../static/img/ban_01.jpg'
import ban2 from '../../../static/img/ban_02.jpg'
import ban3 from '../../../static/img/ban_03.jpg'
import ban4 from '../../../static/img/ban_04.jpg'
import ban5 from '../../../static/img/ban_05.jpg'

export default class BanSwiper extends Component {
  render () {
    const swipers = [
      {
        key: 1,
        src: ban1
      }, {
        key: 2,
        src: ban2
      }, {
        key: 3,
        src: ban3
      }, {
        key: 4,
        src: ban4
      }, {
        key: 5,
        src: ban5
      }
    ]
    return <Fragment>
      {
        swipers.map(v => {
          return <div className="swiper-slide" key={v.key}>
            <img src={v.src} />
          </div>
        })
      }
    </Fragment>
  }
}