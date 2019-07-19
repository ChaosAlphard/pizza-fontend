/**
 * discarded
 */
const setPizzaData = (state:any, data:any): void => {
  state.pizzaData = data
}

const addPizza = (state:any, data:any): void => {
  state.pizzaData.push(data)
}

const removePizza = (state:any, data:any): void => {
  state.pizzaData.forEach((item:Pizza, index:number)=>{
    if(item===data) {
      state.pizzaData.splice(index, 1)
    }
  })
}

// User
const userStatus = (state:any,user:any): void => {
  if(user!=null) {
    state.userInfo = user
    state.isLogin = true
  } else {
    state.userInfo = null
    state.isLogin = false
  }
}

export {
  setPizzaData,
  addPizza,
  removePizza,
  userStatus
}