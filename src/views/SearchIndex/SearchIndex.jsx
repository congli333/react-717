import React, {Component, Fragment} from 'react'
import Input from '../../components/Input'
import SearchList from './children/List'
import './search.scss'

export default class SearchIndex extends Component {
  constructor () {
    super()
    this.state = {
      flag: true, // 判断是搜索还是取消
      historyList: [],
      val: ''
    }
  }
  render () {
    const {flag, historyList, msg, val} = this.state
    const eveSearch = [
      {
        key: 1,
        text: '蜂蜜'
      }, {
        key: 2,
        text: '粽子'
      }, {
        key: 3,
        text: '锅巴',
        color: '#09f'
      }, {
        key: 4,
        text: '小吃'
      }, {
        key: 5,
        text: '特产',
        color: '#f90'
      }, {
        key: 6,
        text: '酱'
      }
    ]
    return <Fragment>
      <div className='search-header'>
        <i className='icon icon-font icon-xiangzuo' onClick={this.comeback.bind(this)}></i>
        <Input ref='search_inp' val={flag}/>
        <span onClick={this.search.bind(this)}>{flag ? '搜索' : '取消'}</span>
      </div>
      <div className='search-main'>
        <div className='search-history'>
          <p>
            <span>最近在搜</span>
            <i className='icon icon-font icon-icon--' onClick={this.removeHis.bind(this)}></i>
          </p>
          <SearchList history = {this.props.history} list={historyList} msg={msg}/>
        </div>
        <div className='search-history search-every'>
          <p>
            <span>大家都在搜</span>
          </p>
          <SearchList history = {this.props.history} list={eveSearch}/>
        </div>
      </div>
    </Fragment>
  }
  // 返回
  comeback () {
    const {location, history} = this.props
    const path = location.state ? location.state.from : '/index/home'
    history.push(path)
  }
  // 清空历史搜索
  removeHis () {
    localStorage.setItem('historySearch', JSON.stringify([]))
    this.setState({
      historyList: []
    })
  }
  // 搜索
  search () {
    const {flag} = this.state
    const val = this.refs.search_inp.state.val
    // val不为空，不为undefiend
    if (/^\s*$/.test(val) || val==undefined) return;
    // 搜索
    if (flag) {
      let ls = localStorage
      // 判断本地有没有历史记录
      if (ls.getItem('historySearch')) {
        const record = JSON.parse(ls.getItem('historySearch'))
        // 判断记录里是否存在当前的数据
        if (record.indexOf(val) > -1) return; 
        record.push(val)
        ls.setItem('historySearch', JSON.stringify(record))
      } else {
        ls.setItem('historySearch', JSON.stringify([val]))
      }
      this.setState({
        historyList: JSON.parse(localStorage.getItem('historySearch')),
        flag: false
      })
      this.props.history.push(`/search/getSearchGoods?content=${val}`)
    }
    // 取消
    else {
      this.setState({
        flag: true
      })
    }
  }
  // 默认历史搜索
  componentDidMount () {
    // 请求历史数据
    if (localStorage.historySearch) {
      this.setState({
        historyList: JSON.parse(localStorage.getItem('historySearch'))
      })
    }
  }
}