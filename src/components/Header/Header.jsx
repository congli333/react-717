import React, {Component} from 'react'
import './header.scss'

export default class Header extends Component {
  render () {
    const {left, center, right, leftClick, rightClick} = this.props
    return <div className='header'>
      <span onClick={leftClick}>{left}</span>
      <span>{center}</span>
      <span onClick={rightClick}>{right}</span>
    </div>
  }
}