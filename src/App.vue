<template>
  <div>
    <router-view/>

    <FooterNav v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav/FooterNav.vue'
// import {mapActions} from 'vuex'
export default{
  created () {
    // 在页面加载时读取localStorage里的状态信息
    // replaceState:替换 store 的根状态，仅用状态合并或时光旅行调试。
    // 因为存到localstorage的是字符串，在取的时候又将字符串转为数组，此时完成了一次深拷贝，所以cartFoods是没有指向shopGoods里了
    localStorage.getItem('userMsg') && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('userMsg'))))

    /* 要进行解耦，最好不要在这里直接操作store，使用action */
    this.$store.dispatch('relinkFoods')
    /* // 成功了，用了比较麻烦的方法，首先知道了原因了，因为用localstorage存值取值的这一过程是进行深拷贝的，所以购物车和shopFoods就不关联了
    //  所以只能重新循环重新push进去了······2020-04-01
    for (let i = 0; i < this.$store.state.shopGoods.length; i++) {
      for (let k = 0; k < this.$store.state.shopGoods[i].foods.length; k++) {
        for (let h = 0; h < this.$store.state.cartFoods.length; h++) {
          // 这里其实最好用id因为是唯一标示，但是因为mock的数据中并没有加上id，所以只能用name替代
          if (this.$store.state.shopGoods[i].foods[k].name === this.$store.state.cartFoods[h].name && this.$store.state.shopGoods[i].foods[k].count) {
            // 这里循环进了两次，一次有count，一次没有(因为mock的数据有重复的食物，因为用name判断的，所以第二个没count的就会覆盖前一个)
            // 这个mock的数据有些问题，首先，没有id，其次，相同的食物应该关联（而不是添加了这个，这个没有添加）
            // console.log('111', this.$store.state.shopGoods[i].foods[k])

            this.$store.state.cartFoods.splice(h, 1, this.$store.state.shopGoods[i].foods[k])
          }
        }
      }
    } */

    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('userMsg', JSON.stringify(this.$store.state))
    })
  },
  mounted () {
    // 向后台获取userInfo，因为一旦刷新，内存中的userInfo就会消失，所以一上来重新获取存储在cookie中的user赋值到store中管理
    this.$store.dispatch('getUserInfo')
    // this.getPosition()
  },
  /* methods:{
      ...mapActions(['getPosition'])
    }, */
  components: {FooterNav}

}

</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>
