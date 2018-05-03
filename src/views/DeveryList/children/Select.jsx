import React, {Component} from 'react'

export default class Select extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectResult: props.result
    }
  }
  render () {
    const {list} = this.props
    const {selectResult} = this.state
    return <label className='select'>
      <span>
        <b>{selectResult}</b>
        <i className='icon iconfont icon-xiangzuo'></i>
      </span>
      <select value={selectResult} onChange = {this.change.bind(this)}>
        <option value='请选择'>请选择</option>
        {
          list.map((v, ind) => {
            const name = v.name ? v.name : v
            return <option value={name} key={name}>{name}</option>
          })
        }
      </select>
    </label>
  }
  change (e) {
    const {change, name, dataName} = this.props
    this.setState({
      selectResult: e.target.value
    })
    change && change(e.target.value, name, dataName)
  }
}