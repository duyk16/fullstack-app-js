import * as actions from '../actions/home.action'

const initialState = {
  data: [],
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case actions.GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case actions.GET_DATA_FAILURE:
      return state
    default:
      return state
  }
}