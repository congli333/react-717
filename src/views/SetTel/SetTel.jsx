import React, {Component, Fragment} from 'react'
import Header from '../../components/Header'
import {connect} from 'react-redux'
import mapDispatch from './dispatch'
import mapState from './state'
import './setTel.scss'

class SetTel extends Component {
  render () {
    return <Fragment>
      <Header left={<i className='icon iconfont icon-xiangzuo'></i>} center={'修改手机号'} right={<i>保存</i>} rightClick={this.saveCurrent.bind(this)}/>
      <div className='tel-main'>
        <input placeholder='输入新的手机号' ref='newTel'/>
      </div>
    </Fragment>
  }
  saveCurrent () {
    const {updateTel, userInfo, history} = this.props
    const newTel = this.refs.newTel.value
    const oldTel = userInfo.tel
    updateTel(oldTel, newTel, history)
  }
}

export default connect(mapState, mapDispatch)(SetTel)