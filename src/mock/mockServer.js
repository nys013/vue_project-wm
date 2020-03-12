/*
 * 使用mock
 */
import Mock from 'mockjs'
import data from './data'

/*
Mock.mock( rurl, template )
记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回
 */
Mock.mock('/shop_goods',{code:0 , data:data.goods})

Mock.mock('/shop_ratings',{code:0 , data:data.ratings})

Mock.mock('/shop_info',{code:0 , data:data.info})