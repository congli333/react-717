import React, {Component, Fragment} from 'react'
import $http from '../../utils/$http'
import Input from '../../components/Input'
import './classify.scss'

export default class Classify extends Component {
  constructor () {
    super()
    this.state = {
      asideList: ['家乡味道', '进口食品', '牛奶乳品', '休闲零食', '生鲜果蔬', '米面粮油', '调味调料', '酒水饮料'], //侧边栏的数据
      classifyList: [], // 分类的数据
      cate_id: 0 // 请求参数
    }
  }
  render () {
    const {asideList, classifyList, cate_id} = this.state
    return <Fragment>
      <div className='classify-header'>
        <Input focus={this.toSearch.bind(this)}/>
      </div>
      <div className='classify-main'>
        <ul className='classify-slide'>
          {
            asideList.map((v, ind) => {
              return <li key={ind} className={ind == cate_id ? 'classify-active' : ''} onClick={this.changeCate.bind(this, ind)}>{v}</li>
            })
          }
        </ul>
        <ol className='classify-right'>
          {
            classifyList.map(v => {
              return <li key={v.cate_id}>
                <img src={v.cate_icon} />
                <span>{v.cate_name}</span>
              </li>
            })
          }
        </ol>
      </div>
    </Fragment>
  }
  // 分类
  changeCate (ind) {
    this.setState({
      cate_id: ind
    })
    $http.get('/mall/category/topCategory', {cate_id: this.state.cate_id}).then(data => {
      this.setState({
        classifyList: data.cates
      })
    })
  }
  // 搜索
  toSearch () {
    const {match, history} = this.props
    history.push('/search/index', {from: match.path})
  }
  componentDidMount () {
    console.log('分类')
    const {cate_id} = this.state
    // 传过去点击的项
    $http.get('/mall/category/topCategory', {cate_id: cate_id}).then(data => {
      this.setState({
        classifyList: data.cates
      })
    })
  }
}