import React, {Component} from 'react'
import LoadImg from '../static/img/loading.gif'

export default class Loading extends Component {
  render () {
    return <img src={LoadImg}/>
  }
}