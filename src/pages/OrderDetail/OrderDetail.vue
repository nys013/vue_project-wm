<template>
  <div>
      <HeaderTop title='订单详情'>
          <span slot='left' class="left-arrow" @click='$router.go(-1)'>
              <i class="iconfont icon-arrow_left"></i>
          </span>
      </HeaderTop>
      <div class="content" v-if="orderDetail.status">
        <h1 class="status">订单已{{orderDetail.status == 'cancel' ? '取消' : '完成'}}</h1>
        <h2 class="thank card">感谢您的信任，期待再次光临</h2>
        <div class="shop card">
          <div class="shopName">{{orderDetail.shopName}}</div>
          <div class="foodWrap" v-for='(food,index) in orderDetail.foods' :key="index">
            <img :src="food.foodImg" alt="" class="foodImg">
            <div class="food">
              <div class="foodName">{{food.name}}</div>
              <div class="count">X {{food.count}}</div>
            </div>
            <div class="price">￥{{food.price}}</div>
          </div>
          <div class="packPrice row">
            <div class="title">包装费</div>
            <div class="price">￥{{orderDetail.packPrice}}</div>
          </div>
          <div class="deliveryPrice row">
            <div class="title">配送费</div>
            <div class="price">￥{{orderDetail.deliveryPrice}}</div>
          </div>
          <div class="discountPrice row" v-for="(discount,index) in orderDetail.discountPrice" :key='index+999'>
            <div class="title">红包/抵用券</div>
            <div class="price">-￥{{discount}}</div>
          </div>
          <div class="footer">
            <div class="allDiscountPrice">已优惠 <span class="price">￥{{allDiscount}}</span> </div>
            <div class="allPrice"> 实付￥ <span class="bigPrice">{{orderDetail.allPrice}}</span></div>
          </div>
        </div>
        <div class="deliveryInfo card">
          <div class="topTitle">配送信息</div>
          <div class="timeWrap row">
            <div class="title">送达时间</div>
            <div class="time">{{orderDetail.deliveryInfo.time}}</div>
          </div>
          <div class="addressWrap row ">
            <div class="title">收获地址</div>
            <div class="addressAndName">
              <div class="address">{{orderDetail.deliveryInfo.address}}</div>
              <div class="name">{{orderDetail.deliveryInfo.name}} {{orderDetail.deliveryInfo.phoneNum}}</div>
            </div>
          </div>
          <div class="deliveryWay row">
            <div class="title">配送方式</div>
            <div class="way">专送</div>
          </div>
        </div>
        <div class="orderInfo card">
          <div class="topTitle">订单信息</div>
          <div class="idWrap row">
            <div class="title">订单号</div>
            <div class="id">{{orderDetail.id}}</div>
          </div>
          <div class="payWay row">
            <div class="title">支付方式</div>
            <div class="id">在线支付</div>
          </div>
          <div class="orderTime row">
            <div class="title">下单时间</div>
            <div class="time">{{orderDetail.time}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { mapState } from "vuex";
export default {
  data () {
    return {
        orderDetail:{}
    }
  },
  components:{HeaderTop},
  computed:{
    ...mapState(['orderList']),
    allDiscount(){
      if (this.orderDetail.discountPrice.length) {
        return this.orderDetail.discountPrice.reduce((preTotal,item) => preTotal+item ,0)
      }
    }
  },
  mounted(){
    this.$store.dispatch("getOrderList");
    const {id} = this.$route.params
    const res = this.orderList.filter(item => item.id == id)
    this.orderDetail = res[0]
  }

}

</script>
<style lang='stylus' scoped>
@import "../../common/stylus/mixins.styl"
.left-arrow{
  .iconfont{
    color white
    font-size 20px
    line-height 45px
    margin-left 5px
  }
}
.content{
  margin-top 45px 
  padding 10px
  background-color #eee
  .status{
    margin 10px 0
    font-size 20px
    font-weight bold
  }
  .thank{
    margin-top 10px
    font-size 16px
    font-weight bold
  }
  .card{
    background-color white
    margin 10px 0
    padding 10px
    border-radius 5px
    .shopName{
      margin 5px 0 15px
      font-size 16px
      font-weight 600
    }
    .foodWrap{
      margin 10px 0
      display flex
      .foodImg{
        width 50px
        height 50px
      }
      .food{
        flex auto
        margin 0 10px
        display flex
        flex-direction column
        justify-content space-between
        .foodName{
          font-size 14px
          font-weight 600
        }
        .count{
          font-size 12px
        }
      }
      .price{
        font-size 14px
        font-weight 600
      }
    }
    .row{
      display flex
      justify-content space-between
      margin 10px 0
      font-size 13px
      .price{
        font-weight 600
      }
      &.discountPrice{
        .price{
          color red
        }
      }
    }
    .footer{
      top-border-1px(rgba(7, 17, 27, 0.1))
      padding-top 10px
      display flex
      justify-content flex-end
      font-size 13px
      align-items flex-end
      .allDiscountPrice{
        margin-right 10px
        .price{
          color red
        }
      }
      .bigPrice{
        font-size 18px
        font-weight 600
      }
    }
    .topTitle{
      font-weight 600
    }
    &.deliveryInfo .row,&.orderInfo .row{
      .title{
        color #737373
      }
    }
    &.deliveryInfo .addressAndName{
      display flex
      flex-direction column
      align-items  flex-end
      .address{
        margin-bottom 5px
      }
    }
  }
}
</style>