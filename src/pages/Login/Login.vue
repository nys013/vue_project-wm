<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message" >
              <input type="tel" maxlength="11" placeholder="手机号"
                     v-model="phone"
                     :οnkeyup="phone=phone.replace(/[^\d]/g,'')">
              <button :disabled="!rightPhone"  @click.prevent="getCode"
                      class="get_verification" :class="{showBlack:rightPhone}">
                {{!countDown ? '获取验证码' : `已发送(${countDown})`}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-show="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-show="!showPwd">
                <div class="switch_button " :class=" showPwd ? 'on':'off' " @click="showPwd=!showPwd">
                  <div class="switch_circle" :class='{right:showPwd}'></div>
                  <span class="switch_text">{{showPwd ? '显示' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha"
                     alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script type='es6'>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqLoginByPhone , reqLoginByPwd ,reqSendcode} from "../../api";

  export default {
    components:{
      AlertTip
    },
    data(){
      return{
        loginWay:true,//登录方式
        phone:'',//输入的手机号
        pwd:'',//输入的密码
        showPwd:false,//显示密码
        countDown:0, //倒计时
        code:'',//短信验证码
        name:'',//用户名
        captcha:'',//图形验证码
        alertText:'',//提示文本
        alertShow:false,//显示警告

      }
    },
    computed:{
      //正确的手机号
      rightPhone(){
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
      }
    },
    methods:{
      /*async getCode(){
        //产生倒计时
        if(!this.countDown){
          this.countDown = 30
          const interval = setInterval(()=>{
            this.countDown--
            if(!this.countDown){
              clearInterval(interval)
            }
          },1000)
          //提交手机号发送ajax请求
          const result = await reqSendcode(this.phone)
          if(result.code === 1){
            //请求发送验证码失败
            this.showTip(result.msg)
            //停止定时器
            clearInterval(interval)
            this.countDown = 0
          } else {
            
          }
        }
      },*/
      async getCode(){
        //产生倒计时
        if(!this.countDown){

          //提交手机号发送ajax请求
          const result = await reqSendcode(this.phone)
          if(result.code === 1){
            //请求发送验证码失败
            this.showTip(result.msg)
          } else {
            this.countDown = 30
            const interval = setInterval(()=>{
              this.countDown--
              if(!this.countDown){
                clearInterval(interval)
              }
            },1000)
          }
        }
      },
      //
      showTip(alertText){
        this.alertText = alertText
        this.alertShow = true
      },
      closeTip(){
        this.alertText = ''
        this.alertShow = false
      },
      //前台表单验证后登陆
      async login(){
        const {rightPhone , code , phone , name , pwd , captcha , showTip ,loginWay} = this

        if(loginWay){//手机验证码登陆
          if(!rightPhone){
            //手机号不正确
            showTip('手机号不正确')
            return
          } else if(!/^\d{6}$/.test(code)) {
            //验证码必须是6位数字
            showTip('验证码必须是6位数字')
            return
          }
          this.result = await reqLoginByPhone(phone , code)

        } else {//账号密码登陆
          if(!name){
            //用户名必须输入
            showTip('用户名必须输入')
            return
          }else if(!pwd){
            //密码必须输入
            showTip('密码必须输入')
            return
          }else if(!captcha){
            //验证码必须输入
            showTip('验证码必须输入')
            return
          }
          this.result = await reqLoginByPwd({name,pwd,captcha})
        }
        if(this.result.code === 0){
          //存储返回值user
          this.$store.dispatch('saveUserInfo',this.result.data)
          //跳转到personal界面
          this.$router.replace('/personal')
        } else {
          //失败则提示相应的信息
          showTip(this.result.msg)
          //更新图片验证码
          this.getCaptcha()
          //清除验证码输入框数据
          this.captcha = ''
        }


      },

      getCaptcha(){
        this.$refs.captcha.src = 'http://localhost:3000/captcha?time' + Date.now()
      }

    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl";
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.showBlack
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(31px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>