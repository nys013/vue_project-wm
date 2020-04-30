<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in shopGoods" :key="index"
              :class="{current:currentIndex===index}" @click="menuClick(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" >
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in shopGoods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul >
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFoodDetail(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
   <!-- <Food :food="food" ref="food"/>-->
<!--    <FoodDetail :food="food" v-show="foodShow" @closeTip="closeTip" />-->
    <FoodDetail :food="food" ref="foodDetail"/>
  </div>
</template>

<script type='es6'>
import {mapState} from 'vuex'
import BScroll from '@better-scroll/core'
import CartControl from '../../../components/CartControl/CartControl'
import FoodDetail from '../../../components/FoodDetail/FoodDetail'
import ShopCart from '../../../components/ShopCart/ShopCart'

export default {
  components: {
    CartControl,
    FoodDetail,
    ShopCart
  },
  computed: {
    ...mapState(['shopGoods', 'cartFoods']),

    currentIndex () {
      // 根据tops区间和scrollY得出目前所在的下标
      //  [0, 748, 1058, 1529, 1650, 1866, 2101, 2412, 2911]
      return this.tops.findIndex((top, index) => {
        return this.scrollY >= top && (this.scrollY < this.tops[index + 1])
      })
    }

    // 注释掉了这一行 2020-04-10
    // newShopGoods () {
    //   /* shopGoods.forEach((good , index) => {

    //     }) */
    //   for (let i = 0; i < this.shopGoods.length; i++) {
    //     for (let k = 0; k < this.shopGoods[i].foods.length; k++) {
    //       // let isadd=true;                          //判断该商品是否在购物车
    //       for (let h = 0; h < this.cartFoods.length; h++) {
    //         if (this.shopGoods[i].foods[k].name === this.cartFoods[h].name) {
    //           this.shopGoods[i].foods[k].count = this.cartFoods[h].count
    //           /* isadd=false;
    //             break; */
    //         }
    //       }
    //       /* if(isadd){
    //           this.shopGoods[i].foods[k].count=0;
    //         } */
    //     }
    //   }
    //   return this.shopGoods
    // }

  },

  data () {
    return {
      tops: [],
      scrollY: 0,
      food: {},
      foodShow: false
    }
  },
  mounted () {
    // 可以传参为回调，那么设置回调事件将会在获取到数据后执行
    this.$store.dispatch('getShopGoods', () => {
      // 同时还要再数据完成页面显示后，才去new
      this.$nextTick(() => {
        this.createBScroll()

        // const lis = this.$refs.foodsUl.children
        const lis = document.querySelectorAll('.foods-wrapper .food-list-hook')
        this.tops = Array.prototype.slice.call(lis).reduce((pretotal, li) => {
          pretotal.push(li.offsetTop)

          return pretotal
        }, [])
        const lastLi = lis[lis.length - 1]
        this.tops.push(lastLi.offsetTop + lastLi.offsetHeight)
        // console.log(this.tops)
      })
    })
  },
  methods: {
    createBScroll () {
      this.foodsScroll = new BScroll('.foods-wrapper', {
        scrollY: true,
        probeType: 1, // 根据这项配置不同，所触发事件的形式不同
        swipeTime: 1000
      })
      /* 饿了么也没有随着食物移动分类也会移动的效果，
        但是美团有，美团上的是在一定范围内让选中的分类块保持在中间，会移动分类块的 */
      this.scroll = new BScroll('.menu-wrapper', {
        scrollY: true
      })

      this.foodsScroll.on('scroll', ({x, y}) => {
        // console.log(x, y)
        this.scrollY = Math.abs(y)
      })
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        // console.log('scrollEnd', y)
        this.scrollY = Math.abs(y)
      })
    },

    menuClick (index) {
      const scrollY = this.tops[index]
      this.foodsScroll.scrollTo(0, -scrollY, 300)
      // 不等scrollEnd才触发效果，自己设定
      this.scrollY = scrollY
    },

    /* 两种父子组件通信的方法,显然是方法二简单，而且因为方法一的影响懒得改了，否则可以直接定义一个函数，传布尔参数就可 */
    // 方法一：使用自定义事件，通过$emit分发事件，只能在父组件去到
    /* showFoodDetail(food){
        this.food = food
        this.foodShow = true
      },

      closeTip(){
        this.foodShow = false
      } */
    // 方法二：在子组件中定义该事件，父组件通过$refs调用
    showFoodDetail (food) {
      this.food = food
      this.$refs.foodDetail.showTip()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
