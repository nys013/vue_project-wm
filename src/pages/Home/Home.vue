<template>
  <section class="msite" style="overflow: hidden;">
    <!--首页头部-->
    <HeaderTop :title="position.name">
      <span class="header_search" slot="left" @click="$router.replace('/search')" >
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right" >
        <router-link to="/login" class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </router-link>
        <router-link to="/userinfo" class="header_login_text" v-else="userInfo._id">
          <i class="iconfont icon-person"></i>
        </router-link>
      </span>
    </HeaderTop>

    <div class="slip-wrap"  style="overflow: hidden;height: 572px;margin-top: 45px">
      <div class="slip-content">
        <!--首页导航-->
        <nav class="msite_nav">
          <div v-if="categorys.length" class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide"  v-for="(categorys , index) in catetorysArr" :key="index" >
                <a href="javascript:" class="link_to_food" v-for="(category , index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl + category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>

            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <div v-else>
            <img src="./images/msite_back.svg" alt="msiteBack">
          </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <ShopList/>
        </div>
      </div>
    </div>

    <!--购物车图标-->
      <div class="msite_shop_cart" :class="move">
        <router-link to="/allcart">
          <i class="iconfont icon-gouwuche"></i>
        </router-link>
      </div>


  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import {mapState , mapActions} from 'vuex'
  import BScroll from '@better-scroll/core'

  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList'
  export default {
    components: {
      HeaderTop,
      ShopList,
    },
    data(){
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com',
        move:"moveIn"
      }
    },
    computed:{
      ...mapState(['position' , 'categorys' ,'userInfo' , "shops"]),

      /*这里是难点之一，首先逻辑比较复杂，其次是考察对push的理解，在push后会直接影响原数组*/
      /*好像又不仅仅是push，而是对引用数据类型的理解，引用数据类型是会实时监测的*/
      catetorysArr (){
        const arr =[]
        let minArr = []

        this.categorys.forEach(c => {
          //debugger
          if(minArr.length === 8){

            minArr = []
            /*const a = []
            const b = []
            console.log(a,b)
            b.push(a)
            a.push("hahaha")*/
            //console.log('000000',minArr,minArr.length,a);
          }
          if(minArr.length === 0 ){
            //小数组关联到了大数组
            arr.push(minArr)
            //console.log('88888',minArr,arr)
          }
          //在这里push后，75行的arr就已经收到了新的c
          minArr.push(c)
        })
        return arr
      }
    },
    methods:{
      ...mapActions(['getPosition' ,'getCategorys' , 'getShops' ]),

    },
    mounted () {
      //this.$store.dispatch('getCategorys')
      //this.$store.dispatch('getPosition')
      this.getPosition()
      this.getCategorys()
      this.getShops()
      //不能在这里new，因为Swiper需要在页面显示完之后才new
      /*new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
        loop: true
      })*/
    },
    watch:{
      /*通过实时监测categorys的变化，即从[]到有数据的变化后*/
      categorys (value){
        //然后利用$nextTick，这个是可以在数据获取之后，且页面显示完毕，其回调函数才执行
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
            loop: true
          })
        })
      },

      shops(value){
        this.$nextTick(() => {
          const scroll = new BScroll('.slip-wrap',{
            //swipeTime:1500,
            probeType:1,
            scrollY:true
          })
          scroll.on("scrollStart",()=>{
            console.log("start");
            this.move = "moveOut"
          })
          scroll.on("scrollEnd",()=>{
            console.log("end");
            this.move = "moveIn"
          })
        })
      }
    }





  }
</script>



<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)

      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
    .msite_shop_cart
      position fixed
      right 20px
      bottom 80px
      z-index 101
      .iconfont
        font-size 40px
        color #02A774
      &.moveOut
        transform translateX(40px)
        opacity 0.5
        transition all 0.5s
      &.moveIn
        transform translateX(0px)
        opacity 1
        transition all 0.5s


</style>