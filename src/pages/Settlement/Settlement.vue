<template>
  <div class="settlementWrap">
    <HeadTop title="确认订单">
      <span slot="left" class="left-arrow" @click="$router.go(-1)">
        <i class="iconfont icon-arrow_left"></i>
      </span>
    </HeadTop>
    <div class="content" :style='`minHeight:${minHeight}px;`'>
      <div class="address card">默认地址（模拟）</div>
      <div class="delivery card">
        <div class="row">
          <div class="left">送达时间</div>
          <div class="right">尽快送达|预计{{expectTime|date-format('HH:mm')}}送达</div>
        </div>
      </div>
      <div class="card">
        <div class="payway row">
          <div class="title">支付方式</div>
          <div class="onlinePay">在线支付</div>
        </div>
        <div class="redPacket row">
          <div class="title">红包</div>
          <div>暂时只在App中支持使用</div>
        </div>
      </div>
      <div class="card orderInfo">
        <div class="shopInfo">
          <img :src="shopInfo.avatar" :alt="shopInfo.name" style='height:50px;'>
          <div>{{shopInfo.name}}</div>
        </div>
        <div class="foods row" v-for='(food,index) in cartFoods' :key='index'>
          <div class="foodName title">{{food.name}}</div>
          <div class="countAndPrice">
            <div class="count">X{{food.count}}</div>
            <div class="price">￥{{food.price}}</div>
          </div>
        </div>
        <div class="delivery row">
          <div class="title">配送费</div>
          <div class="price">￥{{shopInfo.deliveryPrice}}</div>
        </div>
        <div class="pack row">
          <div class="title">包装费</div>
          <!-- 这里假设包装费是一个食物1元。其实如果后台设计的数据有明确包装费就更方便些 -->
          <div class="price">￥{{foodCount}}</div>
        </div>
        <div class="pay row">
          <div class="title">订单 ￥{{allPrice}}</div>
          <div class="price">待支付 ￥{{allPrice}}</div>
        </div>
      </div>
      <div class="card">
        <div class="note row" @click='toNode'>
          <div class="title">订单备注</div>
          <div class="right">{{orderNote || '口味、偏好等'}} ></div>
        </div>
        <div class="invoice row">
          <div class="title">发票抬头</div>
          <div class="right">不需要开发票</div>
        </div>
      </div>
    </div>
    <div class="footer">
        <div class="left">待支付 ￥{{allPrice}}</div>
        <div class="comfirm" @click='toPay'>确认下单</div>
    </div>
  </div>
</template>

<script>
import HeadTop from "../../components/HeaderTop/HeaderTop"
import {mapState} from 'vuex'
export default {
  data() {
    return {
        minHeight:0
    };
  },
  components: { HeadTop },
  computed:{
    ...mapState(['shopInfo','cartFoods','orderNote']),
    expectTime(){
      return this.shopInfo.deliveryTime*60*1000 + Date.now()
    },
    allPrice(){
      const {deliveryPrice} = this.shopInfo
      const foodPrice = this.cartFoods.reduce((preTotal,item) => preTotal + item.price*item.count + 1*item.count , 0)
      return foodPrice+deliveryPrice
    },
    foodCount(){
      return this.cartFoods.reduce((preTotal,item) => item.count + preTotal , 0)
    }
  },
  methods:{
    toNode(){
      this.$router.push('/settlement/note')
    },
    toPay(){
      this.$store.dispatch('clearCart')
      this.$router.replace('/pay')
    }
  },
  mounted(){
    const deviceHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.minHeight = deviceHeight - 45 - 45
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixins.styl';

.settlementWrap {
  .left-arrow {
    .iconfont {
      color: white;
      font-size: 20px;
      line-height: 45px;
      margin-left: 5px;
    }
  }

  .content {
    position: absolute;
    top: 45px;
    width: 100%;
    background-color: #eee;
    margin-bottom 45px
    .card {
      margin: 10px;
      background-color: white;
      border-radius: 5px;
      padding: 10px;

      &.delivery {
        .left {
          font-weight: 600;
        }

        .right {
          font-weight: 400;
          font-size: 14px;
          color: #02A673;
        }
      }

      .shopInfo {
        display flex
        align-items center
        bottom-border-1px(#eee);
        padding: 10px 0;
      }

      .row {
        display: flex;
        justify-content: space-between;
        padding: 15px 0 10px;
        align-items: center;
        font-size: 13px;
        color: #524d4d;

        &.payway {
          bottom-border-1px(#eee);

          .title {
            font-size: 14px;
          }

          .onlinePay {
            font-size: 12px;
            color: #928f8f;
          }
        }

        &.redPacket {
          font-size: 12px;
          color: #928f8f;
        }

        &.foods {
          .countAndPrice {
            display: flex;
            width 80px
            justify-content space-between
            .count {
              color: #f60;
            }
          }
        }

        &.pay {
          top-border-1px(#eee);
          font-size: 14px;

          .price {
            color: #f60;
          }
        }
        &.note,&.invoice{
            font-size 12px
            .right{
                color #928f8f
            }
        }
        &.note{
            bottom-border-1px(#eee)
            .title{
                font-size 14px
                min-width 80px
            }
            .right{
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
            }
        }
      }
    }
  }
  .footer{
      position fixed
      bottom 0
      display flex
      width 100%
      line-height 45px
      height 45px
      z-index 9999
      .left{
          background-color #2d2a2a
          color white
          flex auto
          padding-left 10px
      }
      .comfirm{
          background-color #02a673
          color white
          padding 0 5px
      }
  }
}
</style>