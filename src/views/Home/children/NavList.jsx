import React, {Component} from 'react'

export default class NavList extends Component {
  render () {
    return <ul className="nav-list">
      {
        this.props.list.map(v => {
          return <li key={v.key}>
            <i className={'icon iconfont ' + v.icon}></i>
            <span>{v.text}</span>
          </li>
        })
      }
    </ul>
  }
}