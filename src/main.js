import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Element from 'element-ui'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './icons' // icon
import './permission' // 路由权限
import '@utils/error-log' // error log
import '@utils/mixin.js' // 全局混入
import '@utils/axios.js' // axios

// register global utility filters
import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element, {
  size: localStorage.getItem('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
