//过滤器
import Vue from 'vue'
//import moment from 'moment'
//用date-fns替代moment，且只用其中一部分，因为moment太大了
import format from 'date-fns/format'

//日期过滤器
Vue.filter('date-format',function (value , formatStr='YYYY-MM-DD HH:mm:ss') {
  //return moment(value).format(formatStr)
  return format(value , formatStr)
})

