import axios from 'axios'
export default {
  login (context, creds, redirect) {
    axios.post(`${context.$store.getters.ROOT_URL}/api/login`, creds)
      .then(res => {
        localStorage.setItem('authToken', res.data.token)
        context.$store.dispatch('setUser', res.data.user)
        context.$router.push('/main')
      }).catch((err) => {
        context.$store.dispatch('setErrorMsg', {codeS: err.response.status, type: 'error'})
      })
  },
  signUp (context, creds, redirect) {
    axios.post(`${context.$store.getters.ROOT_URL}/api/signup`, creds)
      .then(res => {
        localStorage.setItem('authToken', res.data.token)
        context.$store.dispatch('setUser', res.data.user)
        context.$router.push('/main')
      }).catch((err) => {
        context.$store.dispatch('setErrorMsg', {codeS: err.response.status, type: 'error'})
      })
  },
  getUser (context) {
    const token = 'bearer ' + localStorage.getItem('authToken')
    return axios.get(`${context.$store.getters.ROOT_URL}/checkAuth`, {headers: {'Authorization': token}})
      .then(res => {
        context.$store.dispatch('setUser', res.data.user)
      }).catch(() => {
        context.$store.dispatch('setErrorMsg', {codeS: 999, type: 'error'})
        this.$router.push('/')
      })
  }
}
