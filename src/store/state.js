/*
 * 管理整个vue可以访问到的state数据
 */

export default {
  longitude: 116.36867, // 经度
  latitude: 40.10038, // 纬度
  categorys: [], // 食品分类列表
  shops: [], // 商家店铺列表
  position: {}, // 当前所在位置
  userInfo: {}, // 登陆的用户信息
  shopInfo: {}, // 商家信息
  shopGoods: [], // 商品
  shopRatings: [], // 评分
  cartFoods: [], // 购物车的食物
  searchShops: []// 搜索所得的商家店铺列表
}
