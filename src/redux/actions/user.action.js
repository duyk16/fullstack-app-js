export const AUTH_REQUEST = "AUTH_REQUEST"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGOUT = "LOGOUT"

export function authRequest() {
  return {
    type: AUTH_REQUEST,
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
export function loginRequest(text) {
  return {
    type: LOGIN_REQUEST,
    text
  }
}
export function loginSuccess(text) {
  return {
    type: LOGIN_SUCCESS,
    text
  }
}
export function loginFailure(text) {
  return {
    type: LOGIN_FAILURE,
    text
  }
}
export function registerRequest(text) {
  return {
    type: REGISTER_REQUEST,
    text
  }
}
export function registerSuccess(text) {
  return {
    type: REGISTER_SUCCESS,
    text
  }
}
export function registerFailure(text) {
  return {
    type: REGISTER_FAILURE,
    text
  }
}
export function logOut(text) {
  return {
    type: LOGOUT,
    text
  }
}