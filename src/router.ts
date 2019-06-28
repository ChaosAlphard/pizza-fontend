import Vue from 'vue'
import Router from 'vue-router'

// 一级路由
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
import Admin from './components/Admin.vue'
import About from './components/about/About.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

// 二级路由
import History from './components/about/History.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/menu',
      name: 'menu',
      component: Menu
    },{
      path: '/admin',
      name: 'admin',
      component: Admin
    },{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./components/about/About.vue'),
      children: [{
          path: '/about/history',
          name: 'history',
          component: History
        }]
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '*',
      redirect: '/'
    }
  ]
})
