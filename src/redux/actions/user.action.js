export const REQUEST = "REQUEST"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = "LOGOUT"
export const UPDATE_AVATAR = "UPDATE_AVATAR"

export function request() {
  return {
    type: REQUEST,
  }
}
export function authSuccess(userData) {
  return {
    type: AUTH_SUCCESS,
    userData
  }
}
export function authFailure(text) {
  return {
    type: AUTH_FAILURE,
    text
  }
}
export function loginSuccess(userData) {
  return {
    type: LOGIN_SUCCESS,
    userData
  }
}
export function loginFailure(text) {
  return {
    type: LOGIN_FAILURE,
    text
  }
}
export function logOut() {
  return {
    type: LOGOUT,
  }
}
export function updateAvatar(avatar) {
  return {
    type: UPDATE_AVATAR,
    avatar
  }
}