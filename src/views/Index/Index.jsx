import React, {Component, Fragment} from 'react'
import {Redirect, Switch} from 'react-router-dom'
import $http from '../../utils/$http'
import RouteWrapper from '../../components/routeWrapper'
import Footer from '../../components/Footer'

export default class Index extends Component {
  render () {
    const {routes} = this.props
    return <Fragment>
      <div className='main'>
        <Switch>
          <RouteWrapper routes = {routes}/>
        </Switch>
      </div>
      <Footer />
    </Fragment>
  }
}