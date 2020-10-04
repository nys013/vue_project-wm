<template>
  <div>
    <section class="order">
      <HeaderTop title="订单列表" />
      <section class="order_no_login" v-if="!userInfo._id">
        <img src="./images/person.png" />
        <h3>登录后查看外卖订单</h3>
        <button @click="toLogin">立即登陆</button>
      </section>
      <section v-else class="list" >
        <div class="tab">
          <div class="tab-item" :class="tabActive=='all' ? 'active' : ''" @click='tabActive="all"'>全部</div>
          <div class="tab-item" :class="tabActive=='rating' ? 'active' : ''" @click='handleRating'>待评价</div>
          <div class="tab-item" :class="tabActive=='refund' ? 'active' : ''" @click='handleRefund'>退款</div>
        </div>
        <div class="scrollWrap" :style="`overflow: hidden;height:${height}px;margin-top: 45px;`">
          <div class="orderListWrap" >
            <div class="orderListItem" v-for="orderItem in showList" :key='orderItem.id' @click='toOrderDetail(orderItem.id)'>
              <img class="shopImg" :src='orderItem.shopImg'>
              <div class="content">
                <div class="shopName">
                  <div class="name">{{orderItem.shopName}} </div>
                  <div class="arrow-right">></div>
                </div>
                <div class="dateTime">{{orderItem.time}}</div>
                <div class="product"><div class="productName">{{orderItem.foods[0].name}}</div> 等{{orderItem.foods.length}}件商品</div>
              </div>
              <div class="aside">
                <div class="status">{{status(orderItem.status)}}</div>
                <div class="allPrice">￥{{orderItem.allPrice}}</div>
              </div>
            </div>
            <div v-if="!showList.length" class="noOrder">暂无订单</div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { mapState } from "vuex";
import BScroll from '@better-scroll/core'
export default {
  components: {
    HeaderTop,
  },
  data(){
    return{
      tabActive:'all',
      height:0
    }
  },
  computed: {
    ...mapState(["userInfo", "orderList"]),
    showList(){
      if (this.tabActive == 'all') {
        return this.orderList
      } else {
        return this.orderList.filter(item => item.status == this.tabActive)
      }
    },
  },
  watch:{
    showList(value){
      this.$nextTick(()=>{
        if (value.length) {
          this.scroll = new BScroll('.scrollWrap',{
            scrollY: true
          })
        }
      })
    }
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    status(s){
      if (s == 'completed') {
        return '已完成'
      }else if(s == 'rating'){
        return '待评价'
      }else if(s == 'refund'){
        return '已退款'
      }else{
        return '已取消'
      }
    },
    toOrderDetail(id){
      this.$router.push('/order/detail/'+id)
    },
    handleRating(){
      this.tabActive="rating"
      this.scroll.scrollTo(0,0)
    },
    handleRefund(){
      this.tabActive="refund"
      this.scroll.scrollTo(0,0)
    }
  },
  mounted() {
    if (this.userInfo._id) {
      this.$store.dispatch("getOrderList");
      const deviceHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.height = deviceHeight - 50 - 45 - 40
    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.order { // 订单
  width: 100%;
  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    >img {
      display: block;
      width: 100%;
      height: 30%;
    }
    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }
    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
  .list{
    background-color #eee
    .tab{
      position fixed
      top 45px
      height 40px
      line-height 40px
      background #fff
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .tab-item{
        position relative
        float left
        width: 33.33333%
        text-align center
        font-size 14px
        color rgb(77, 85, 93)
        &.active{
          color #02a774
          &::after{
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
          }
        }
      }
    }
    .orderListWrap{
      padding 5px 0
      .orderListItem{
        display flex
        justify-content space-between
        margin 10px
        padding 8px
        height 70px
        border-radius 5px
        background-color white
        .shopImg{
          height 50px
          width 50px
        }
        .content{
          width 150px
          flex auto
          margin 0 10px
          .shopName{
            display flex
            justify-content space-between
            .name{
              font-size 14px
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
            }
            .arrow-right{
              align-self flex-start
            }
          }
          .dateTime{
            margin 10px 0 20px 0
            font-size 12px
            color #9f9797
          }
          .product{
            font-size 12px
            display flex
            .productName{
              width 50px
              white-space nowrap 
              text-overflow ellipsis 
              overflow hidden
            }
          }
        }
        .aside{
          padding 5px 0
          width 50px
          display flex
          flex-direction column
          justify-content space-between
          align-items flex-end
          .status{
            font-size 12px
            color red
          }
          .allPrice{
            font-size 12px
          }
        }
      }
    }
    .noOrder{
      text-align center
    }
  }
    
}
</style>
