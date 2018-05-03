// 路由
import Index from '../views/Index'
import Home from '../views/Home'
import Classify from '../views/Classify'
import Cart from '../views/Cart'
import Mine from '../views/Mine'
import Detail from '../views/Detail'
import NotFound from '../views/NotFound'
import Search from '../views/Search'
import SearchGoods from '../views/SearchGoods'
import SearchIndex from '../views/SearchIndex'
import Register from '../views/Register'
import Login from '../views/Login'
import Setting from '../views/Setting'
import SetPortraint from '../views/SetPortraint'
import SetUsername from '../views/SetUsername'
import SetEr from '../views/SetEr'
import SetTel from '../views/SetTel'
import SettingIndex from '../views/SettingIndex'
import DeveryList from '../views/DeveryList'

export default {
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/index/home',
          name: 'home',
          component: Home
        }, {
          path: '/index/classify',
          name: 'classify',
          component: Classify
        }, {
          path: '/index/cart',
          name: 'cart',
          component: Cart,
          authority: true, // 增加权限
        }, {
          path: '/index/mine',
          name: 'mine',
          component: Mine,
          authority: true // 增加权限
        }/* , {
          name: '404',
          component: NotFound
        } */
      ]
    }, {
      path: '/detail',
      component: Detail,
      name: 'detail'
    }, {
      path: '/search',
      component: Search,
      name: 'search',
      children: [
        {
          path: '/search/getSearchGoods',
          component: SearchGoods,
          name: 'searchGoods'
        }, {
          path: '/search/index',
          component: SearchIndex,
          name: 'searchIndex'
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/setting',
      component: Setting,
      name: 'setting',
      children: [
        {
          path: '/setting/index',
          name: 'index',
          component: SettingIndex
        }, {
          path: '/setting/setPortraint',
          name: 'setPortraint',
          component: SetPortraint
        }, {
          path: '/setting/setUsername',
          name: 'setUsername',
          component: SetUsername
        }, {
          path: '/setting/setEr',
          name: 'setEr',
          component: SetEr
        }, {
          path: '/setting/setTel',
          name: 'setTel',
          component: SetTel
        }
      ]
    }, {
      path: '/deveryList',
      component: DeveryList,
      name: 'deveryList'
    }/* , {
      name: '404',
      component: NotFound
    } */
  ]
}