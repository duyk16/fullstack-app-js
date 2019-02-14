import * as actions from '../actions/user.action'

const initialState = {
  userData: {},
  isLoggedIn: false,
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case actions.AUTH_SUCCESS:
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        isLoggedIn: true
      }
    case actions.AUTH_FAILURE:
    case actions.LOGIN_FAILURE:
    case actions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}