import Vue from 'vue'
import Vuex from 'vuex'

// 引入被抽离的部分
// import * as getters from '@/store/getters'
// import * as mutations from '@/store/mutations'
// import * as actions from '@/store/action'

// 引入被抽离的module
import pizza from '@/store/module/pizza'
import user from '@/store/module/user'
import alert from '@/store/module/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pizza,
    user,
    alert
  }
  // // 设置属性
  // state: {
  //   pizzaData: [] as Array<Pizza>,
  //   userInfo: {} as User | null,
  //   isLogin: false as boolean
  // },
  // // 获取属性状态
  // getters,
  // // 改变属性状态
  // mutations,
  // // 应用mutations
  // actions
})
