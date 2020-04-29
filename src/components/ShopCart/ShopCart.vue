<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{shopInfo.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
        <transition name="move">
          <div class="shopcart-list" v-show="isShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="clearCart">清空</span>
            </div>
            <div class="list-content">
              <ul>
                <li class="food" v-for="(food, index) in cartFoods" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price"><span>￥{{food.price}}</span></div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="isShow" @click="toggleShow"></div>
    </transition>

  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import CartControl from '../../components/CartControl/CartControl'
import {MessageBox} from 'mint-ui'
import BScroll from '@better-scroll/core'
export default {
  components: {
    CartControl
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState(['cartFoods', 'shopInfo']),
    ...mapGetters(['totalCount', 'totalPrice']),
    payClass () {
      const {totalPrice, shopInfo} = this
      return totalPrice >= shopInfo.minPrice ? 'enough' : 'not-enough'
    },
    payText () {
      const {totalCount, totalPrice, shopInfo} = this
      if (totalCount === 0) {
        return `${shopInfo.minPrice}元起送`
      } else if (totalPrice >= shopInfo.minPrice) {
        return '结算'
      } else {
        return `还需要${shopInfo.minPrice - totalPrice}元起送`
      }
    }

  },

  /*
    在原来的版本中，eslint报错，大概就是computed中修改其他数据是不合适的，因为其本身只要getter，不过我们可以自己设置setter
    修改好后还是存在bug，原本computed会在函数中依赖的数据变化时也会调用变化
      而因为该计算属性listShow在修改时才触发setter，那么totalCount为0时是不会触发的，此时购物车就收不回来了
    最后，便不使用computed，而是用watch监视totalCount和isShow的变化，数量为0则更改isShow为false不显示，不为0 则new一个BScroll对象使购物车能够滑屏

  */
  watch: {
    totalCount () {
      const {totalCount} = this
      if (totalCount === 0) {
        this.isShow = false
      }
    },
    isShow () {
      if (this.isShow) {
        // 在数据确定 ，且列表显示后才new一个BScroll对象
        this.$nextTick(() => {
          // 设置为单例事件
          if (!this.scroll) {
            this.scroll = new BScroll('.list-content', {
              scrollY: true,
              // 老师说的那个问题，只要不将click设为true就好了啊，就会是原生的事件
              click: true
            })
          } else {
            // 设置为单例事件后，就没办法滑动了，所以需要更新一下
            this.scroll.refresh()
          }
        })
      }
    }
  },

  methods: {
    toggleShow () {
      if (this.totalCount) {
        this.isShow = !this.isShow
      }
    },

    clearCart () {
      MessageBox.confirm('确定清空购物车？').then(action => {
        this.$store.dispatch('clearCart')
      }, () => {})
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active , &.move-leave-active
        transition transform 0.3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active , &.fade-leave-active
      transition opacity 0.3s
    &.fade-enter , &.fade-leave-to
      opacity 0
      /*background rgba(7, 17, 27, 0)*/
</style>
