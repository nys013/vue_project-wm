<template>
  <div>
    <HeadTop title="等待支付">
      <span slot="left" class="left-arrow" @click="$router.go(-1)">
        <i class="iconfont icon-arrow_left"></i>
      </span>
    </HeadTop>
    <div class="content">
        <div class="title">下单成功，等待支付</div>
        此处模拟下单，无法支付
    </div>
  </div>
</template>

<script>
import HeadTop from "../../components/HeaderTop/HeaderTop";
export default {
  data() {
    return {};
  },
  components: { HeadTop },
};
</script>
<style lang='stylus' scoped>
  .left-arrow {
    .iconfont {
      color: white;
      font-size: 20px;
      line-height: 45px;
      margin-left: 5px;
    }
  }
  .content{
      position relative
      top 45px
      text-align center
      font-size 20px
      font-weight 600
      .title{
          margin 10px 0 50px
      }
  }
</style>