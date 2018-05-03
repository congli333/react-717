import React, {Component, Fragment} from 'react'
import $http from '../../utils/$http'
import { T } from 'react-toast-mobile';
import '../Login/login.scss'

export default class Register extends Component {
  constructor () {
    super()
    this.state = {
      tel: '',
      pwd: '',
      check: '',
      checkCode: '获取验证码'
    }
  }
  render () {
    const {tel, pwd, check, checkCode} = this.state
    this.changeVal = this.changeVal.bind(this)
    return <Fragment>
      <div className='login-header'>
        <i className='icon icon-font icon-xiangzuo' onClick={this.back.bind(this)}></i>
        <span>注册717</span>
        <i onClick={this.toLogin.bind(this)}>登录</i>
      </div>
      <div className='login-main'>
        <label htmlFor='tel'>
          <i className='icon icon-font icon-weibiaoti2fuzhi12'></i>
          <input type='text' name='tel' placeholder='请输入您的手机号' value={tel} onChange={this.changeVal}/>
        </label>
        <label htmlFor='check'>
          <i className='icon icon-font icon-weibiaoti2fuzhi12'></i>
          <input type='text' name='check' placeholder='请输入验证码' value={check} onChange={this.changeVal}/>
          <span onClick={this.getCheckCode.bind(this)}>{checkCode}</span>
        </label>
        <label htmlFor='pwd'>
          <i className='icon icon-font icon-weibiaoti2fuzhi12'></i>
          <input type='password' name='pwd' placeholder='请输入您的密码' value={pwd} onChange={this.changeVal}/>
        </label>
        <p><button onClick={this.register.bind(this)}>立即注册</button></p>
        <h5><a href='#'>忘记密码</a></h5>
      </div>
    </Fragment>
  }
  // 返回上一级
  back () {
    this.props.history.push('/index/home')
  }
  // 受控组件
  changeVal (e) {
    const {value, name} = e.target
    let {tel, pwd, check} = this.state
    switch(name) {
      case 'tel': tel=value; break;
      case 'pwd': pwd=value; break;
      case 'check': check=value; break;
    }
    this.setState({
      tel: tel,
      pwd: pwd,
      check: check
    })
  }
  // 注册
  register () {
    const {tel, pwd, check, checkCode} = this.state
    const {location, history} = this.props
    // 先验证验证码
    if (check === checkCode) {
      $http.post('/user/register', {tel, pwd}).then(data => {
        console.log(data)
        if (data.code === 1) {
          console.log('注册成功')
          history.push('/login')
        } else {
          alert('注册失败')
          this.setState({checkCode: '获取验证码'})
        }
        // T.alert(data.info)
      })
    } else {
      alert('验证码输入错误'); 
      this.setState({checkCode: '获取验证码'})
    }
  }
  // 登录
  toLogin () {
    this.props.history.replace('/login')
  }
  // 获取验证码
  getCheckCode () {
    const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "s", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const codes = []
    while (codes.length<4) {
      const ind = Math.floor(Math.random()*arr.length)
      codes.indexOf(arr[ind]) == -1 && codes.push(arr[ind])
    }
    console.log(codes)
    this.setState({
      checkCode: codes.join('')
    })
    setTimeout(() => {
      this.setState({
        checkCode: '输入超时'
      })
    }, 10000)
  }
}