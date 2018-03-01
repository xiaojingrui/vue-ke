import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('../components/home')
const take = () => import('../components/take.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/take',
      name: 'take',
      component: take
    }
  ]
})
