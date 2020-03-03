<template>
  <div>
    <router-view/>
    <FooterNav v-show="$route.meta.showFooter"/>
  </div>
</template>

<script type='es6'>
  import FooterNav from './components/FooterNav/FooterNav.vue'

  export default{

    components:{FooterNav}
  }

</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>