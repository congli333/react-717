import React, {Component, Fragment} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {getCookie} from '../utils/utils'

export default class RouteWrap extends Component {
  render () {
    const {routes} = this.props
    return <Switch>
      {
        routes.map(v => {
          return <Route path={v.path} key={v.name} render={location => {
            // 判断权限
            if (v.authority) {
              // 判断是否登录，没有登录跳转登录页
              if (!getCookie('token') || getCookie('token') == '') {
                return <Redirect from={v.path} to='/login'/>
              }
            }
            return <v.component {...location} routes={v.children}/>
          }} />
        })
      }
    </Switch>
  }
}