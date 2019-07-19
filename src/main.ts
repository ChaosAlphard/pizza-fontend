import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// 类型定义
import '@/types/typeAlias'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 预加载Pizza
axios.get(`/pizza/find`)
.then((res:any)=>{
  if(res.data.code===200){
    store.commit("setPizzaData", res.data.data)
  } else {
    console.log(res.data)
    store.dispatch("showAlert",`${res.data.code}: ${res.data.msg}`)
  }
}).catch((err:any)=>{
  console.warn(err)
  store.dispatch("showAlert", "网络异常")
})

// 使用LocalStorage 保存的信息自动登录
const eml = localStorage.getItem('eml')
const pwd = localStorage.getItem('pwd')

if(eml&&pwd) {
  axios.post(`/user/login?email=${eml}&password=${pwd}`)
  .then((res:any)=>{
    if(res.data.code===200){
      const user = res.data.model
      store.dispatch("setUser",user)
      if(user.level === 2) {
        router.addRoutes([{
          path: '/admin',
          name: 'admin',
          component: () => import('@/views/Admin')
        }])
      }
    } else {
      localStorage.removeItem("eml")
      localStorage.removeItem("pwd")
      store.dispatch("setUser",null)
      store.dispatch("showAlert",`${res.data.code}: ${res.data.msg}`)
    }
  }).catch((err:any)=>{
    console.warn(err)
    store.dispatch("showAlert", "网络异常")
  })
}