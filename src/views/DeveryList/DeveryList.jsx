import React, {Component, Fragment} from 'react'
import Header from '../../components/Header'
import Select from './children/Select'
import './deveryList.scss'

export default class DeveryList extends Component {
  constructor () {
    super()
    this.state = {
      province: [], // 省
      city: [], // 市
      district: [], // 区
      result: '请选择'
    }
  }
  render () {
    const {province, city, district, result} = this.state
    return <Fragment>
      <Header left={<i className='icon iconfont icon-xiangzuo'></i>} center={'收货人'} leftClick={this.leftClick.bind(this)}/>
      <div className='deveryList-main'>
        <section className='deveryList-info'>
          <input type='text' placeholder='收货人姓名'/>
          <input type='text' placeholder='手机号'/>
          <Select list={province} name='city' dataName='province' change = {this.change.bind(this)}/>
          <Select list={city} name='district' dataName = 'city' result = {result} change = {this.change.bind(this)  }/>
          <Select list={district} result = {result}/>
          <input type='text' placeholder='  详细地址'/>
        </section>
        <label  htmlFor='submit'>
          <button id='submit'>保存</button>
        </label>
      </div>
    </Fragment>
  }
  leftClick () {
    this.props.history.push('/index/home')
  }
  componentDidMount () {
    fetch('server/area.json').then(res => {
      return res.json()
    }).then(data => {
      this.setState({
        province: data
      })
    })
  }
  change (val, name, dataName) {
    this.state[dataName].map(v => {
      if (v.name == val) {
        console.log(11)
        this.setState({
          [name]: v.city ? v.city : v.area
        })
      }
    })
    this.setState({
      result: '请选择'
    })
  }
}