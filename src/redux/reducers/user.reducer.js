import * as actions from '../actions/user.action'

const initialState = {
  userData: {},
  isLoggedIn: false,
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case action.AUTH_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        isLoggedIn: true
      }
    case action.AUTH_FAILURE:
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}