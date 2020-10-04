/*
 * 包含多个直接更新state的方法的对象
 */
// import storage from '../common/storageUtil'

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
  SET_FOOD_SELECT,
  RELINK_FOODS,
  RECEIVE_ORDER_LIST,
  RECEIVE_ORDER_NOTE
} from './mutation-types'

export default {
  [RECEIVE_POSITION] (state, position) {
    state.position = position
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  /* 2.0版本 */
  [RECEIVE_SHOP_GOODS] (state, shopGoods) {
    if (!state.shopGoods.length) {
      state.shopGoods = shopGoods
    } else {
      /* 解决退出去再进来页面数量不对问题---因为每次都会重新发请求获取数据（无count），所以再获取完之后，还要将相应的数量从购物车中取出加上 */
      resetShopGoods(state)
    }
  },

  [RECEIVE_SHOP_INFO] (state, shopInfo) {
    state.shopInfo = shopInfo
  },
  [RECEIVE_SHOP_RATINGS] (state, shopRatings) {
    state.shopRatings = shopRatings
  },
  [PLUS_FOOD_COUNT] (state, food) {
    if (!food.count) {
      // 虽然food有数据绑定，但是这里的count是新增加的属性，所以没有绑定，所以需要由Vue的一个方法来加上
      // food.count = 1
      // 三个参数：对象，key（属性名，是字符串），value（属性值）
      Vue.set(food, 'count', 1)
      Vue.set(food, 'selected', true)
      // 因为food是引用数据类型，所以设置一次就会关联起来
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [MINUS_FOOD_COUNT] (state, food) {
    if (food.count) {
      food.count--
      // 当count为0，从购物车中移除
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [RESET_CART] (state) {
    // 将food中的count置为0
    // eslint不允许箭头函数返回一个表达式，所以要用{}括起来，那么就不会自动return了
    state.cartFoods.forEach(food => { food.count = 0 })

    // 清空购物车
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOPS] (state, searchShops) {
    state.searchShops = searchShops
  },

  [SET_FOOD_SELECT] (state, flag) {
    if (flag) {
      flag.selected = !flag.selected
    } else {
      let trueCount = state.cartFoods.reduce((pretotal, food) => {
        return pretotal + (food.selected ? 1 : 0)
      }, 0)
      if (!trueCount || trueCount === state.cartFoods.length) {
        state.cartFoods.forEach((food, index) => { food.selected = !food.selected })
      } else {
        state.cartFoods.forEach((food, index) => { food.selected = true })
      }
    }
  },

  [RELINK_FOODS] (state) {
    // localstorage存值取值的这一过程是进行深拷贝的，所以购物车和shopFoods就不关联了
    //  所以只能重新循环重新push进去了
    // let z = 0
    for (let i = 0; i < state.shopGoods.length; i++) {
      for (let k = 0; k < state.shopGoods[i].foods.length; k++) {
        for (let h = 0; h < state.cartFoods.length; h++) {
          // console.log('判断循环几次', ++z)
          // 这里其实最好用id因为是唯一标示，但是因为mock的数据中并没有加上id，所以只能用name替代
          // mock数据没有id，同名但不是同一个食物，实际接口应该是同id同食物
          if (state.shopGoods[i].foods[k].name === state.cartFoods[h].name && state.shopGoods[i].foods[k].count) {
            state.cartFoods.splice(h, 1, state.shopGoods[i].foods[k])
            // 用break可减少循环次数，这算是一个小优化吧
            break
          }
        }
      }
    }
  },

  // 将订单信息存入vuex中
  [RECEIVE_ORDER_LIST](state,data){
    state.orderList = data
  },

  // 将订单备注存入vuex中
  [RECEIVE_ORDER_NOTE](state,data){
    state.orderNote = data
  }


}

// const resetShopGoods = (state)=>{
//   for(let i=0;i<state.shopGoods.length;i++){
//     for(let k=0;k<state.shopGoods[i].foods.length;k++){
//       for( let h=0;h<state.cartFoods.length;h++){
//         //这里其实最好用id因为是唯一标示，但是因为mock的数据中并没有加上id，所以只能用name替代
//         if(state.shopGoods[i].foods[k].name===state.cartFoods[h].name){
//           state.shopGoods[i].foods[k].count=state.cartFoods[h].count
//         }
//       }
//     }
//   }
// }
const resetShopGoods = (state) => {
  for (let i = 0; i < state.shopGoods.length; i++) {
    for (let k = 0; k < state.shopGoods[i].foods.length; k++) {
      // 用数组的方法indexOf应该比直接遍历（上面注释的方法）要快一些
      const index = state.cartFoods.indexOf(state.shopGoods[i].foods[k])
      if (index >= 0) {
        state.shopGoods[i].foods[k].count = state.cartFoods[index].count
        // 循环善用break可减少一定的循环次数，优化，加快运行效率
        break
      }
    }
  }
}
