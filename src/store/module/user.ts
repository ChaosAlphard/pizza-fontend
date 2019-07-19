const state = {
  userInfo: {} as User | null,
  isLogin: false as boolean
}

const getters = {
  getUserInfo: (state:any) => state.userInfo,
  isLogin: (state:any) => state.isLogin
}

const mutations = {
  userLogin(state:any, user: User): void {
    state.userInfo = user
    state.isLogin = true
  },
  userLogout(state:any): void {
    state.userInfo = null
    state.isLogin = false
  }
}

const actions = {
  setUser({commit}:any, user: User) {
    if(user!=null) {
      commit("userLogin", user)
    } else {
      commit("userLogout")
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}