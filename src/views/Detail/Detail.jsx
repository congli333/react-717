import React, {Component, Fragment} from 'react'
import Header from '../../components/Header'
import './detail.scss'

export default class Detail extends Component {
  render () {
    const {img, info} = this.props.location.state
    return <Fragment>
      <Header left={<i className='icon iconfont icon-xiangzuo'></i>} center={'详情页'} leftClick={this.toBack.bind(this)}/>
      <div className='detail-main'>
        <dl>
          <dt>
            <img src={img} />
          </dt>
          <dd>
            <p>{info}</p>
          </dd>
        </dl>
      </div>
    </Fragment>
  }
  toBack () {
    const {history, location} = this.props
    const path = location.state.from ? location.state.from : '/index/home'
    history.push(path)
  }
}