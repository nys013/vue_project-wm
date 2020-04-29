export default {
  saveCartFoods (CartFoods) {
    window.localStorage.setItem('cart_foods_key', JSON.stringify(CartFoods))
  },
  getCartFoods () {
    return JSON.parse(window.localStorage.getItem('cart_foods_key') || '[]')
  },
  saveShopGoods (shopGoods) {
    window.localStorage.setItem('shop_foods_key', JSON.stringify(shopGoods))
  },
  getShopGoods () {
    return JSON.parse(window.localStorage.getItem('shop_foods_key') || '[]')
  }
}
