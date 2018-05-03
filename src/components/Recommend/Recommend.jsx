import React, {Component} from 'react'
import GoodsList from '../Goods'
import $http from '../../utils/$http'
import './recommend.scss'

export default class Recommend extends Component {
  constructor () {
    super()
    this.state = {
      list: []
    }
  }
  render () {
    return <div className='recommend'>
      <h3>热门推荐</h3>
      <GoodsList goods_list={this.state.list} />
    </div>
  }
  componentDidMount () {
    $http.get('/user/getHotRecommend').then(res => {
      this.setState({
        list: res.data
      })
    })
  }
}