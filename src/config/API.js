import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 2000,
});

exports.createUser = (user) => {
  return instance.post('/users', {...user})
}