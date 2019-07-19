/**
 * discarded
 */
const setUser = ({commit}:any, user: User) => {
  commit("userStatus", user)
}

export {
  setUser
}