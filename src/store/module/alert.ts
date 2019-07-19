const state = {
  alertMsgs: [] as string[][]
}

const getters = {
  getMsgs: (state:any) => state.alertMsgs,
}

const mutations = {
  setAlertMsg(state:any, msg:string): void {
    state.alertMsgs.push([Math.random().toString(36), msg])
    setTimeout(() => {
      state.alertMsgs.shift()
    }, 1500);
  }
}

const actions = {
  showAlert({commit}:any, msg:string): void {
    commit("setAlertMsg", msg)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}