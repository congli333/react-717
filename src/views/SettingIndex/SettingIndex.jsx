import React, {Component, Fragment} from 'react'
import portrait from '../../static/img/static_portrait.png'
import {delCookie} from '../../utils/utils'
import {connect} from 'react-redux'
import $http from '../../utils/$http'
import {getCookie} from '../../utils/utils'
import {SAVE_USER_INFO} from '../../store/reducers'
import './setting.scss'

class SettingIndex extends Component {
  render () {
    const {userInfo} = this.props
    return <Fragment>
      <div className='set-header'>
        <i className='icon iconfont icon-xiangzuo' onClick={this.back.bind(this)}></i>
        <span>设置</span>
      </div>
      <div className='set-main'>
        <ul className='set-list'>
          <li>
            <span>我的头像</span>
            <p>
              <img src={portrait}/>
              <i className='icon iconfont icon-xiangyou' onClick={this.toSet.bind(this, 'setPortrait')}></i>
            </p>
          </li>
          <li>
            <span>用户名</span>
            <p>
              {userInfo.username ? userInfo.username : userInfo.tel}
              <i className='icon iconfont icon-xiangyou' onClick={this.toSet.bind(this, 'setUsername')}></i>
            </p>
          </li>
          <li>
            <span>我的二维码图片</span>
            <p>
              <img src={portrait}/>
              <i className='icon iconfont icon-xiangyou' onClick={this.toSet.bind(this, 'setEr')}></i>
            </p>
          </li>
          <li>
            <span>修改手机号</span>
            <p>
              {userInfo.tel}
              <i className='icon iconfont icon-xiangyou' onClick={this.toSet.bind(this, 'setTel')}></i>
            </p>
          </li>
        </ul>
        <button onClick={this.exitLogin.bind(this)}>退出登录</button>
      </div>
    </Fragment>
  }
  back () {
    const {history, location} = this.props
    const path = location.state ? location.state.from : '/index/mine'
    history.push(path)
  }
  toSet (path) {
    this.props.history.push(`/setting/${path}`)
  }
  // 退出登录
  exitLogin () {
    delCookie('token')
    this.props.history.push('/login')
  }
  componentDidMount () {
    console.log('get')
    const {history, getUserInfo} = this.props
    getUserInfo(history)
  }
}

function mapState (state) {
  console.log(state)
  return {
    userInfo: state.save_user_info
  }
}
function mapDispatch (dispatch) {
  return {
    getUserInfo (history) {
      $http.post('/user/getUserInfo', {token: getCookie('token')}).then(res => {
        const {code, info} = res
        if (code == 0) {
          console.log(info)
          history.push('/login')
        } else {
          dispatch({
            type: SAVE_USER_INFO,
            info
          })
        }
      })
    }
  }
}
export default connect(mapState, mapDispatch)(SettingIndex)
