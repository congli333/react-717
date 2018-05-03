import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import NotFound from './views/NotFound'
import RouteWrapper from './components/routeWrapper'
import router from './router'
import {Provider} from 'react-redux'
import store from './store/store'
import './static/css/reset.css'
import './static/css/style.scss'
import './utils/setfont'
const {routes} = router

export default class App extends Component {
  render () {
    return <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/index/home' />
          <RouteWrapper routes={routes}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  }
}