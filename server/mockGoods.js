// goods的模拟数据
const Mock = require('mockjs')
const Random = Mock.Random
const fs = require('fs')
// 产品数据
const goods = Mock.mock({
  'list|100-200': [
    {
      key: () => Mock.mock('@increment()'),
      goods_name: () => Mock.mock('@ctitle(10, 20)'),
      goods_price: () => Mock.mock('@float(60, 100, 2, 2)'),
      goods_img: () => Random.image('200x200', Random.color(), Random.cword(2))
    }
  ]
})
fs.writeFileSync('server/goods.json', JSON.stringify(goods))
// 分类数据
const asideList = ['家乡味道', '进口食品', '牛奶乳品', '休闲零食', '生鲜果蔬', '米面粮油', '调味调料', '酒水饮料']
const classifyList = Mock.mock({
  'classifyList|8': [
    {
      'category|+1': asideList,
      'cates|3-10': [
        {
          cate_id: () => Mock.mock('@increment()'),
          cate_name: () => Mock.mock('@cword(2, 4)'),
          cate_icon: () => Random.image('50x50', Random.color(), Random.cword(1))
        }
      ]
    }
  ]
})
fs.writeFileSync('server/classifyList.json', JSON.stringify(classifyList))
