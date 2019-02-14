export const REQUEST = "REQUEST"
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
export const GET_DATA_FAILURE = "GET_DATA_FAILURE"

export const request = () => ({
  type: REQUEST,
})
export const getDataSuccess = (data) => ({
  type: GET_DATA_SUCCESS,
  data
})
export const getDataFailure = () => ({
  type: GET_DATA_FAILURE,
})