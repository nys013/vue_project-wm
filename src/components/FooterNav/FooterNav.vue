<template>
  <div class="footer_guide top-border-1px">
    <router-link class="guide_item" :class="{on : '/home' === $route.path}" to="/home">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link  class="guide_item" :class="{on : '/search' === $route.path}" to="/search">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link  class="guide_item" :class="{on : '/order' === $route.path}" to="/order">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </router-link>
    <router-link  class="guide_item" :class="{on : '/personal' === $route.path}" to="/personal">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script type='es6'>
export default{

}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
.footer_guide
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px
</style>
