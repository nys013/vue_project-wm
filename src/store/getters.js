/*
 * Created by 大可爱 on 2020/3/3.
 */
export default {
  totalPrice (state) {
    return state.cartFoods.reduce((pretotal, food) => pretotal + food.count * food.price, 0)
  },
  totalCount (state) {
    return state.cartFoods.reduce((pretotal, food) => pretotal + food.count, 0)
  },
  positiveSize (state) {
    return state.shopRatings.reduce((pretotal, rating) => pretotal + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
