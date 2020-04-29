/*
 * 封装ajax
 */
import axios from 'axios'

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr) {
        // slice---（数组、字符串的方法）第一个参数是从什么位置开始，第二个参数是保留到什么位置（第二个参数指定就不被包含在内）
        //     ---不会影响原字符串、数组，将截取的数组字符串作为返回值返回
        dataStr = dataStr.slice(0, -1)
        // splice---（仅数组的方法）第一个参数是从哪里开始删除，第二个参数是删除几个，第三个参数以后就是添加（可以传递一些元素，这些元素会插入到第一个参数索引前边）
        //      ---会影响原数组，将被删除的元素作为返回值返回
        // dataStr.splice(-1,1)
        url = url + '?' + dataStr
      }

      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
