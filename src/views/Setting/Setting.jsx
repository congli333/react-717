import React, {Component} from 'react'
import {Switch, Redirect} from 'react-router-dom'
import RouteWrapper from '../../components/routeWrapper'

export default class Setting extends Component {
  render () {
    const {routes} = this.props
    return <Switch>
      <RouteWrapper routes={routes} />
    </Switch>
  }
}