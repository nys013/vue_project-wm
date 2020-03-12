<template>
 <!-- <div>
    <ShopHeader/>
    <router-link to="/shop/shopgoods">商品</router-link>
    <router-link to="/shop/shopratings">评分</router-link>
    <router-link to="/shop/shopinfo">商家信息</router-link>
    <router-view/>
  </div>-->
  <div >
    <ShopHeader ref="header"/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/shopgoods" replace >商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopratings" replace >评分</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopinfo" replace >商家信息</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script type='es6'>
  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  export default {
    components:{
      ShopHeader
    },
    mounted(){
      this.$store.dispatch('getShopInfo')
    },
    methods:{
      //以失败告终的点击其他地方也能关闭
      /*closeTip(){
        this.$refs.header.closeTip()
      }*/
    }

  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>