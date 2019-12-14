import './firebase'
import Vue from 'vue'
import App from './App.vue'
import Admin from './components/Admin'
import Ventas from './components/Ventas'
import VueRouter from 'vue-router'
import Vue2Filters from 'vue2-filters'
import { rtdbPlugin } from 'vuefire'

Vue.use(VueRouter)
Vue.use(Vue2Filters)
Vue.use(rtdbPlugin)


const routes = [
  { path: '/admin', component: Admin },
  { path: '/ventas', component: Ventas },
  { path: '/', component: Admin },
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
