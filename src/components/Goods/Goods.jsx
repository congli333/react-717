import React, {Component} from 'react'
import GoodsItem from './children/GoodsItem'

export default class Goods extends Component {
  render () {
    const {goods_list, history, from} = this.props
    return <div className='goods'>
      {
        goods_list.map(v => {
          return <GoodsItem key={v.key} goods_info={v} history={history} from={from}/>
        })
      }
    </div>
  }
}