<template>
  <div>
    <router-view/>

    <FooterNav v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterNav from './components/FooterNav/FooterNav.vue'
  import {mapActions} from 'vuex'
  export default{
    created () {
      /*//在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })*/
      //在页面加载时读取localStorage里的状态信息
      localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(JSON.parse(localStorage.getItem("userMsg"))));

      //在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
      })


    },
    mounted(){
      //向后台获取userInfo，因为一旦刷新，内存中的userInfo就会消失，所以一上来重新获取存储在cookie中的user赋值到store中管理
      this.$store.dispatch('getUserInfo')
      //this.getPosition()
    },
    /*methods:{
      ...mapActions(['getPosition'])
    },*/
    components:{FooterNav},

  }

</script>

<style lang='stylus' rel='stylesheet/stylus'>


</style>