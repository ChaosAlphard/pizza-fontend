const state = {
  pizzaData: [] as Pizza[],
  requestUrl: 'find' as string,
  query: '' as string,
  page: 0 as number,
  more: true
}

const getters = {
  getPizzaData: (state:any) => state.pizzaData,
  hasQueryParam: (state:any) => state.query&&state.query.length > 0,
  getQueryParam: (state:any) => state.query,
  getCurrentPage: (state:any) => state.page,
  hasMorePizza: (state:any) => state.more,
  hasPizzaData: (state:any) => state.pizzaData&&state.pizzaData.length>0
}

const mutations = {
  setPizzaData(state:any, data:Pizza[]): void {
    state.pizzaData = data
    state.page = 0
    state.more = true
  },

  pushPizzaData(state:any, data:Pizza[]): void {
    state.pizzaData.push(...data)
    if(data&&data.length < 10) {
      state.more = false
    }
    if(!state.more) { return }
    state.page++
  },

  setPage(state:any, num:number): void {
    state.page = num
  },

  setQueryParam(state:any, str:string): void {
    // 去除空格
    state.query = str.replace(/^\s*|\s*$/g, "")
  },

  noMore(state:any): void {
    state.more = false
  }
}

const actions = {
  setPizza({commit}:any, data:Pizza[]) {
    commit("setPizzaData", data)
  },
  pushPizza({commit}:any, data:Pizza[]) {
    commit("pushPizzaData", data)
  },
  setQuery({commit}:any, str:string) {
    commit("setQueryParam", str)
  },
  noMoreData({commit}:any) {
    commit("noMore")
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}