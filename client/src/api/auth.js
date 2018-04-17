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
      }).catch((err) => {
        context.$store.dispatch('setErrorMsg', {codeS: err.response.status, type: 'error'})
      })
  }
}
