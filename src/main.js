/**
 * 入口js
 */

import Vue from 'vue'
import App from './App.vue'
import {Button,Field} from 'mint-ui'
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

// 要想按需使用，还得下载babel-plugin-component插件和对babelrc进行配置(http://mint-ui.github.io/docs/#/en2/quickstart)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)

// 图片懒加载，安装上后，就会在其内部多了个lazy指令
Vue.use(VueLazyload, {
  loading,
  error
})

// 因为eslint不允许new了一个对象后不接收其实例，所以需要声名式赋值
const vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
// 接着因为声明就要使用，不然会报错，所以就用Vue.use()
Vue.use(vm)
