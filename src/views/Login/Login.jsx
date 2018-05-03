import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import mapDispatch from './dispatch'
import './login.scss'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      tel: '',
      pwd: ''
    }
  }
  render () {
    const {tel, pwd} = this.state
    this.changeVal = this.changeVal.bind(this)
    return <Fragment>
      <div className='login-header'>
        <i className='icon icon-font icon-xiangzuo' onClick={this.back.bind(this)}></i>
        <span>登录717</span>
        <i onClick={this.toRegister.bind(this)}>注册</i>
      </div>
      <div className='login-main'>
        <label htmlFor='tel'>
          <i className='icon icon-font icon-weibiaoti2fuzhi12'></i>
          <input type='text' name='tel' placeholder='请输入您的手机号' value={tel} onChange={this.changeVal}/>
        </label>
        <label htmlFor='pwd'>
          <i className='icon icon-font icon-weibiaoti2fuzhi12'></i>
          <input type='password' name='pwd' placeholder='请输入您的密码' value={pwd} onChange={this.changeVal}/>
        </label>
        <p><button onClick={this.login.bind(this)}>立即登录</button></p>
        <h5><a href='javascrilt;'>忘记密码</a></h5>
      </div>
    </Fragment>
  }
  back () {
    this.props.history.push('/index/home')
  }
  changeVal (e) {
    const {value, name} = e.target
    let {tel, pwd} = this.state
    switch(name) {
      case 'tel': tel=value; break;
      case 'pwd': pwd=value; break;
    }
    this.setState({
      tel: tel,
      pwd: pwd
    })
  }
  // 存储当前用户信息
  login () {
    const {tel, pwd} = this.state
    const {history, from, saveUserInfo} = this.props
    saveUserInfo(tel, pwd, from, history)
  }
  // 注册
  toRegister () {
    this.props.history.replace('/register')
  }
}

export default connect(null, mapDispatch)(Login)