import Vue from 'vue'
import Router, {Route} from 'vue-router'

// 一级路由组件
import Home from '@/views/Home.vue'
import Menu from '@/views/Menu.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

// 二级路由组件
import Contact from '@/components/about/Contact.vue'
import Delivery from '@/components/about/Delivery.vue'
import Guide from '@/components/about/Guide.vue'

Vue.use(Router)

const router: Router = new Router({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home
      components: {
        default: Home,
        'Guide': Guide,
        'Contact': Contact,
        'Delivery': Delivery
      }
    },{
      path: '/menu',
      name: 'menu',
      component: Menu
    },{
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      children: [
        {
          path: '/about/contact',
          name: 'contact',
          component: Contact
        },{
          path: '/about/delivery',
          name: 'delivery',
          component: Delivery
        },{
          path: '/about/guide',
          name: 'guide',
          component: Guide
        }
      ],
      redirect: '/about/contact'
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '/notfound',
      name: 'notfound',
      component: () => import('@/components/NotFound.vue')
    },{
      path: '*',
      redirect: {name: 'notfound'}
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {x:0,y:0}
  }
})

router.beforeEach((to: Route, from: Route, next: Function): void => {
  const vuexStore = (router as any).app.$options.store
  const isLogin = vuexStore.getters.isLogin
  if(isLogin) {
    if(to.path !== '/login') {
      next()
    } else {
      next('/')
    }
  } else if(to.path === '/admin') {
    vuexStore.dispatch("showAlert", "请先登录")
    next('/login')
  } else {
    next()
  }
})

export default router
