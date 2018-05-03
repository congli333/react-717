import React, {Component} from 'react'
import {Switch, Redirect} from 'react-router-dom'
import RouerSwiper from '../../components/routeWrapper'

export default class Search extends Component {
  render () {
    return <Switch>
      <RouerSwiper routes={this.props.routes}/>
    </Switch>
  }
}