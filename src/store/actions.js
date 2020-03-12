/*
 * 包含多个通过发送mutation间接更新state的方法的对象
 */
import {
  reqPosition,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogOut,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShops
} from '../api'

import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_RATINGS,
  MINUS_FOOD_COUNT,
  PLUS_FOOD_COUNT,
  RESET_CART,
  RECEIVE_SEARCH_SHOPS,
  SET_FOOD_SELECT
}from './mutation-types'

export default {
  //获取当前所在位置
  async getPosition ({commit , state}){
    const geohash = state.latitude + "," + state.longitude
    console.log(geohash);
    const result = await reqPosition(geohash)
    if(result.code === 0){
      commit(RECEIVE_POSITION,result.data)
    }
  },

  //获取食品分类列表
  async getCategorys ({commit}){
    const result = await reqFoodCategorys()
    if(result.code === 0){
      commit(RECEIVE_CATEGORYS,result.data)
    }
  },

  //获取商品列表
  async getShops ({commit , state}){
    const {longitude , latitude} = state
    const result = await reqShops(longitude , latitude)
    if(result.code === 0){
      commit(RECEIVE_SHOPS,result.data)
    }
  },

  //获取登录用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO,result.data)
    }
  },

  //保存用户登录信息
  saveUserInfo({commit} , userInfo){
    commit(RECEIVE_USER_INFO,userInfo)
  },

  //退出登录
  async logOut({commit}){
    const result = await reqLogOut()
    if(result.code === 0){
      commit(RESET_USER_INFO)
    }
  },

  //获取商品
  async getShopGoods({commit} , callback ){
    const result = await reqShopGoods()
    if(result.code === 0){
      commit(RECEIVE_SHOP_GOODS , result.data)

      callback && callback()
    }
  },

  //获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code === 0){
      commit(RECEIVE_SHOP_INFO , result.data)
    }
  },

  //获取评分评价列表
  async getShopRatings({commit} , callback){
    const result = await reqShopRatings()
    if(result.code === 0){
      commit(RECEIVE_SHOP_RATINGS , result.data)

      callback && callback()
    }
  },

  //更新食物选择的数量的同步action
  updateFoodCount({commit} , {isPlus , food}){
    if(isPlus){
      //分发增加的mutation
      commit(PLUS_FOOD_COUNT , food)
    } else {
      //分发减少的mutation
      commit(MINUS_FOOD_COUNT , food)
    }
  },

  //清空购物车
  clearCart({commit}){
    commit(RESET_CART)
  },

  //根据地理位置和关键字搜索店铺
  async searchShops({commit , state} , keyword ){
    const geohash = state.latitude + "," + state.longitude
    const result = await reqSearchShops(geohash , keyword)
    if(result.code === 0){
      commit(RECEIVE_SEARCH_SHOPS,result.data)
    }
  },

  //设置总购物车食物选择情况
  setFoodSelect({commit} , flag){
    commit(SET_FOOD_SELECT,flag)
  }

}
