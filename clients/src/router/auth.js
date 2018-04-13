import axios from 'axios'
import { Message } from 'element-ui'
import gv from '../globalvariable'
const ROOT_URL = gv.ROOT_URL
export default {
  user: {
    userid: '',
    username: '',
    authenticated: false,
    role: null
  },

  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('id_token')
    }
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    var role = localStorage.getItem('user_role')
    var username = localStorage.getItem('username')
    var userid = localStorage.getItem('userid')
    if (jwt) {
      this.user.authenticated = true
      this.user.role = role
      this.user.username = username
      this.user.userid = userid
    } else {
      this.user.authenticated = false
    }
  },

  logout (context) {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    context.$router.push('/')
  },

  login (context, creds, redirect) {
    // var self = this
    var email = creds.username
    var password = creds.password
    axios.post(`${ROOT_URL}/api/login`, {email, password})
    .then(response => {
      console.log(response)
      // localStorage.setItem('id_token', response.data.token)
      // localStorage.setItem('user_role', response.data.Type)
      // localStorage.setItem('username', response.data.Email)
      // localStorage.setItem('userid', response.data.Id)
      // self.user = {
      //   username: response.data.username,
      //   role: response.data.type,
      //   authenticated: true,
      //   userid: response.data.id
      // }
      // location.reload()
      // if (self.user.role === 'user') {
      //   context.$router.push('/main')
      // } else if (self.user.role === 'admin') {
      //   context.$router.push('/main')
      // }
    })
  },

  signup (context, creds, redirect) {
    var self = this
    var username = creds.username
    var password = creds.password
    var fullname = creds.fullname
    axios.post(`${ROOT_URL}/api/signup`, {username, password, fullname})
    .then(response => {
      localStorage.setItem('id_token', response.data.token)
      localStorage.setItem('user_role', response.data.type)
      localStorage.setItem('username', response.data.username)
      localStorage.setItem('userid', response.data.id)
      self.user = {
        userid: response.data.id,
        username: username,
        role: response.data.type,
        authenticated: true
      }
      location.reload()
      if (self.user.role === 'user') {
        context.$router.push('/main')
      } else if (self.user.role === 'admin') {
        context.$router.push('/main')
      }
    })
    .catch((err) => {
      Message({
        showClose: true,
        message: err.response.data.error,
        type: 'error'
      })
    })
  }
}
