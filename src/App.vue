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
    localStorage.getItem('state') && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('state'))))

    /* 要进行解耦，不要在这里直接操作store，而去使用action */
    this.$store.dispatch('relinkFoods')

    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('state', JSON.stringify(this.$store.state))
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
