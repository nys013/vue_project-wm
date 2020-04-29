/**
 * 入口js
 */

import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'
import error from './common/img/404.jpg'

import router from './router/index.js'
import store from './store'

// 引入mockServer,因为其不需要向外暴露什么，所以直接引入
import './mock/mockServer'

// 过滤器，只需要引入即可(因为其不用向外暴露）
import './filter'

// 要想按需使用，还得下载插件和进行配置，官网没说，具体看全家桶资料
Vue.component(Button.name, Button)

// 图片懒加载，安装上后，就会在其内部多了个lazy指令
Vue.use(VueLazyload, {
  loading,
  error
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
