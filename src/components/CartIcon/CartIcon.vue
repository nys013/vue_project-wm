<template>
  <div class="msite_shop_cart">
    <!--因为感觉代码很少，没必要抽成组件，就加到Home中了，这个就没有意义了-->
    <router-link to="/allcart">
      <i class="iconfont icon-gouwuche"></i>
    </router-link>
  </div>
</template>

<script type='es6'>
export default {}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .msite_shop_cart
      position fixed
      right 20px
      bottom 80px
      z-index 101
      .iconfont
        font-size 40px
        color #02A774
</style>
