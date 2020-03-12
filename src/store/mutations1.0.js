/*
 * 包含多个直接更新state的方法的对象
 */
import storage from '../common/storageUtil'

import Vue from 'vue'
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
  [RECEIVE_POSITION](state , position){
    state.position = position
  },
  [RECEIVE_CATEGORYS](state , categorys){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state , shops){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },
  //1.0版本，虽然解决了问题，但又产生了新的大bug，
  // 主要还是因为三点运算符只是浅拷贝，进行的也是浅比较，所以会导致重复，最好的办法还是一层层循环进去
  /*[RECEIVE_SHOP_GOODS](state , shopGoods){
    const oldShopGoods = state.shopGoods
    if(!oldShopGoods.length){
      state.shopGoods = shopGoods
    }else{
      const newShopGoods = [...oldShopGoods,...shopGoods]
      let newArr = []; //定义一个新数组
      for(let i=0; i<newShopGoods.length; i++){
        //判断相邻两个元素是否相等。
        //注意：当arr[i]为最后一个元素时，arr[i+1]位undefined，arr[i] != undefined,所以是可以取到最后一个元素的。
        if(newShopGoods[i] != newShopGoods[i+1]){
          newArr.push(newShopGoods[i]);
        }
      }
      state.shopGoods = newArr
    }
  },*/
  /*2.0版本*/
  [RECEIVE_SHOP_GOODS](state , shopGoods){
    if(!state.shopGoods.length){
      state.shopGoods = shopGoods
    }else{
      /*解决退出去再进来页面数量不对问题---因为每次都会重新发请求获取数据（无count），所以再获取完之后，还要将相应的数量从购物车中取出加上*/
      resetShopGoods(state)

    }
    storage.saveShopGoods(state.shopGoods)

  },
  //原来的方案
  /*[RECEIVE_SHOP_GOODS](state , shopGoods){
    state.shopGoods = shopGoods
  },*/
  [RECEIVE_SHOP_INFO](state , shopInfo){
    state.shopInfo = shopInfo
  },
  [RECEIVE_SHOP_RATINGS](state , shopRatings){
    state.shopRatings = shopRatings
  },
  [PLUS_FOOD_COUNT](state , food){
    if(!food.count){
      //虽然food有数据绑定，但是这里的count是新增加的属性，所以没有绑定，所以需要由Vue的一个方法来加上
      //food.count = 1
      //三个参数：对象，key（属性名，是字符串），value（属性值）
      Vue.set(food , 'count' , 1)
      Vue.set(food , 'selected' , true)
      //因为food是引用数据类型，所以设置一次就会关联起来
      state.cartFoods.push(food)


    } else {
      //food.count++
      state.cartFoods.forEach(cartFood => {
        if(cartFood.name === food.name){
          cartFood.count++
        }
      })
      resetShopGoods(state)
    }
    //每当CartFoods改变的时候，就要存一下，而且将ShopGoods也存起来，因为其内部count也改变了
    //但是，发现每次改变都要存很麻烦，而且还产生了不知名的bug，就是怎么改都不对
    //所以查了查，应该在生命周期回调中存取整个store，参见另一个版本
    storage.saveCartFoods(state.cartFoods)
    storage.saveShopGoods(state.shopGoods)
  },
  [MINUS_FOOD_COUNT](state , food){
    if(food.count){
      state.cartFoods.forEach(cartFood => {
        if(cartFood.name === food.name){
          cartFood.count--
        }
      })
      resetShopGoods(state)
      //当count为0，从购物车中移除
      if(food.count === 0 ){
        state.cartFoods.splice(state.cartFoods.indexOf(food) , 1)
      }
    }
    storage.saveCartFoods(state.cartFoods)
    storage.saveShopGoods(state.shopGoods)
  },
  [RESET_CART](state){
    //将food中的count置为0
    state.cartFoods.forEach(food => food.count = 0 )

    //清空购物车
    state.cartFoods = []
    storage.saveCartFoods(state.cartFoods)
    storage.saveShopGoods(state.shopGoods)
  },
  [RECEIVE_SEARCH_SHOPS](state , searchShops){
    state.searchShops = searchShops
  },

  [SET_FOOD_SELECT](state , flag){
    if(flag){
      flag.selected = !flag.selected
    }else{
      let trueCount = state.cartFoods.reduce((pretotal,food)=>{
        return pretotal + (food.selected ? 1 : 0)
      },0)
      if(!trueCount || trueCount===state.cartFoods.length){
        state.cartFoods.forEach((food,index) => food.selected = !food.selected)
      }else{
        state.cartFoods.forEach((food,index) => food.selected = true)
      }
    }
    storage.saveCartFoods(state.cartFoods)
    storage.saveShopGoods(state.shopGoods)

  }
}

const resetShopGoods = (state)=>{
  for(let i=0;i<state.shopGoods.length;i++){
    for(let k=0;k<state.shopGoods[i].foods.length;k++){
      for( let h=0;h<state.cartFoods.length;h++){
        //这里其实最好用id因为是唯一标示，但是因为mock的数据中并没有加上id，所以只能用name替代
        if(state.shopGoods[i].foods[k].name===state.cartFoods[h].name){
          state.shopGoods[i].foods[k].count=state.cartFoods[h].count
        }
      }
    }
  }
}
