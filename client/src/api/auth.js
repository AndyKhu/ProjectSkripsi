import axios from 'axios'
function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
export default {
  verification (context, type, user) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/verification/${type}/${user}`)
  },
  login (context, creds, redirect) {
    axios.post(`${context.$store.getters.ROOT_URL}/api/login`, creds)
      .then(res => {
        localStorage.setItem('authToken', res.data.token)
        context.$store.dispatch('setUser', res.data.user)
        if (res.data.user.Type === 'AdminResto') {
          context.$router.push('/mainAR')
        } else if (res.data.user.Type === 'SYSTEM') {
          context.$router.push('/mainSA')
        } else {
          context.$router.push('/')
        }
      }).catch((err) => {
        context.$store.dispatch('setErrorMsg', {codeS: err.response.status, type: 'error'})
      })
  },
  signUp (context, creds, redirect) {
    creds.Id = guid()
    axios.post(`${context.$store.getters.ROOT_URL}/api/signup`, creds)
      .then(res => {
        context.$router.push('/AfterRegister')
      }).catch((err) => {
        context.$store.dispatch('setErrorMsg', {codeS: err.response.status, type: 'error'})
      })
  },
  signupA (context, creds, redirect) {
    creds.Id = guid()
    let fileId = guid()
    let formdata = new FormData()
    formdata.append('img', creds.Img)
    return axios.post(`${context.$store.getters.ROOT_URL}/api/upload/reqAdmin/${fileId}`, formdata).then(proc => {
      fileId = guid()
      formdata = new FormData()
      formdata.append('img', creds.Img2)
      axios.post(`${context.$store.getters.ROOT_URL}/api/upload/reqAdmin/${fileId}`, formdata).then(proc2 => {
        fileId = guid()
        formdata = new FormData()
        formdata.append('img', creds.Img3)
        axios.post(`${context.$store.getters.ROOT_URL}/api/upload/reqAdmin/${fileId}`, formdata).then(proc3 => {
          let data = {
            Id: creds.Id,
            Email: creds.email,
            Password: creds.password,
            fullName: creds.fullName,
            restoName: creds.restoName,
            PID: proc.data.PID,
            PID2: proc2.data.PID,
            PID3: proc3.data.PID,
            Pname: proc.data.Pname,
            Ptype: proc.data.Ptype
          }
          axios.post(`${context.$store.getters.ROOT_URL}/api/createReqAdmin`, data).then(proc2 => {
            context.$router.push('/AfterRegister')
          }).catch(err => {
            context.$store.dispatch('setErrorMsg', {codeS: err.response.status, type: 'error'})
          })
        })
      })
    })
  },
  async getUser (context) {
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
