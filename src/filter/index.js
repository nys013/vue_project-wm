//过滤器
import Vue from 'vue'
// import moment from 'moment'
//用date-fns替代moment，且只用其中一部分，因为moment太大了
import format from 'date-fns/format'

//日期过滤器
// 用moment（大）
// Vue.filter('date-format',function (value , formatStr='YYYY-MM-DD HH:mm:ss') {
//   return moment(value).format(formatStr)
// })

// 用format（小）
/* 
官方文档：dd是Day of month，DD是Day of year;YYYY是当地以周为计数的年份，yyyy则是公历年
*/
Vue.filter('date-format',function (value , formatStr='yyyy-MM-dd HH:mm:ss') {
  return format(value , formatStr)
})

