import React, {Component} from 'react'

export default class List extends Component {
  render () {
    const {list} = this.props
    return <div className='search-list'>
      {
        list.length > 0 ? list.map((v, ind) => {
          const {key, text, color} = v
          return <span onClick={this.toResult.bind(this, text?text:v)} key={key? key : ind} style={{'color': color ? color : '#333', 'borderColor': color ? color : '#333'}}>{text ? text : v}</span>
        }) : <p>没有搜索记录，快去逛逛吧！！！</p>
      }
    </div>
  }
  toResult (text) {
    this.props.history.push('/search/getSearchGoods', {content: text})
  }
}