import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 4000,
});

exports.createUser = (user) => {
  return instance.post('/users', user)
}
exports.login = (user) => {
  return instance.post('/users/login', user)
}
exports.getUserById = (userId, token) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return instance.get(`/users/${userId}`)
}

exports.getPost = () => {
  return instance.get('/posts')
}

exports.uploadAvatar = (userId, formData) => {
  // instance.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  return instance.post(`/users/${userId}/upload/avatar`, formData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  })
}

exports.createPost = (userId, formData) => {
  return instance.post(`/posts/${userId}`, formData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  })
}