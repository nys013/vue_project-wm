import Vue from 'vue'
import VueRouter from 'vue-router'

/*import Home from '../pages/Home/Home.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Personal from '../pages/Personal/Personal.vue'*/

//路由懒加载，就是让其在打包时生成不同的js文件，在需要时才去发送请求获取
//不是所有的路由都需要这样，主要是文件比较大的需要，否则小文件多次发送请求就得不偿失了
//只需要把普通的import换成使用import函数，得到的也是函数，返回值就是路由组件，只有在调用的时候才用加载该路由
const Home = () => import('../pages/Home/Home.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Personal = () => import('../pages/Personal/Personal.vue')
const AllCart = ()=> import('../pages/AllCart/AllCart')


import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/allcart',
      component:AllCart
    },
    {
      path:'/home',
      component:Home,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/personal',
      component:Personal,
      meta:{
        showFooter:true
      }
    },
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'shopgoods',
          component:ShopGoods
        },
        {
          path:'shopratings',
          component:ShopRatings
        },
        {
          path:'shopinfo',
          component:ShopInfo
        },
        {
          path:'',
          redirect:'shopgoods'
        }
      ]
    },
  ]
})