<template>
  <div class="shop-info">
    <div class="shopInfo-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{shopInfo.description}}</span>
            <span>由商家配送提供配送，约{{shopInfo.deliveryTime}}分钟送达，距离{{shopInfo.distance}}</span>
          </div>
          <div class="delivery-money">配送费￥{{shopInfo.deliveryPrice}}</div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div class="activity-item" v-for="(support, index) in shopInfo.supports" :key="index"
              :class="supportClasses[support.type]">
            <span class="content-tag">
              <span class="mini-tag">{{support.name}}</span>
            </span>
            <span class="activity-content">{{support.content}}</span>
          </div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picsUl">
            <li class="pic-item" v-for="(pic, index) in shopInfo.pics" :key="index">
              <img width="120" height="90" :src="pic"/>
            </li>
          </ul>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li><span class="bold">品类</span> <span>{{shopInfo.category}}</span></li>
          <li><span class="bold">商家电话</span> <span>{{shopInfo.phone}}</span></li>
          <li><span class="bold">地址</span> <span>{{shopInfo.address}}</span></li>
          <li><span class="bold">营业时间</span> <span>{{shopInfo.workTime}}</span></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['shopInfo']),

    supportClasses () {
      return ['activity-green', 'activity-red', 'activity-orange']
    }
  },

  mounted () {
    // 如果在当前页面刷新，那么info并没有获取，所以就不能在这里new
    if (!this.shopInfo) {
      return
    }

    // 从主页来的，那么info已经获取了
    this._initInfo()
  },

  watch: {
    // 如果在当前页面刷新，那么info并没有获取，所以需要观察其从[]到有值的变化，且页面显示之后，才去new
    shopInfo () {
      this.$nextTick(() => {
        this._initInfo()
      })
    }
  },

  methods: {
    _initInfo () {
      const ul = this.$refs.picsUl
      // ul.children是伪数组，不能直接调用数组的方法
      // const lisLength = ul.children.reduce((pretotal , li) => pretotal + li.offsetWidth ,0)
      const lis = Array.prototype.slice.call(ul.children)
      const lisLength = lis.reduce((pretotal, li) => {
        // offsetWidth只包括内容区、padding、border、滚动条占位，是不包括margin的
        return pretotal + li.offsetWidth
      }, 24)
      ul.style.width = lisLength + 'px'

      this.scroll = new BScroll('.shop-info', {
        scrollX: true
      })
      this.scroll2 = new BScroll('.pic-wrapper', {
        scrollX: true
      })
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .shop-info
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    background: #fff;
    overflow: hidden
    .section
      padding 16px 14px 14px
      font-size 16px
      background-color #fff
      color #666
      border-bottom 1px solid #eee
      position relative
      .section-title
        color #000
        font-weight 700
        line-height 16px
        > .iconfont
          float right
          color #ccc
      .delivery
        margin-top 16px
        font-size 13px
        line-height 18px
        .delivery-icon
          width 55px
          font-size 11px
          margin-right 10px
          display inline-block
          text-align center
          color #fff
          background-color #0097ff
          padding 1px 0
          border-radius 4px
        .delivery-money
          margin-top 5px

      .activity
        margin-top 16px
        .activity-item
          margin-bottom 12px
          display flex
          font-size 13px
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79)
          .content-tag
            display inline-block
            border-radius 2px
            width 36px
            height: 18px
            margin-right 10px
            color #fff
            font-style normal
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 24px
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        margin-top 16px
        .pic-list
          font-size: 0
          /*display inline-block*/
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
      .detail
        margin-bottom -16px
        > li
          display flex
          justify-content space-between
          align-items center
          margin-right -10px
          padding 16px 12px 16px 0
          line-height 16px
          bottom-border-1px(#ddd)
          font-size 13px
          > .bold
            font-weight 700
            color #333
          &:last-child
            border-none()

    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
</style>
