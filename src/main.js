// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//分享组件
import vshare from 'vshare'
Vue.use(vshare)

//头部组件
import HeaderNav from './components/HeaderNav.vue'
Vue.component('HeaderNav', HeaderNav)
import FooterNav from './components/FooterNav.vue'
Vue.component('FooterNav', FooterNav)

//axios
import Axios from 'axios'
import {BASEURL} from '../static/globalSet/api'
Axios.defaults.baseURL= BASEURL
Vue.prototype.$ = Axios

//图片懒加载
// import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   loading: '../static/loading-svg/loading-spinning-bubbles.svg',
//   attempt: 1
// })

import 'babel-polyfill'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
