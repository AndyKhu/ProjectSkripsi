import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ROOT_URL: 'http://localhost:8001',
    errorMsg: null,
    User: null
  },
  mutations: {
    resetErrorMsg: (state, value) => {
      state.errorMsg = null
    },
    setErrorMsg: (state, value) => {
      if (value.codeS === 401 || value.codeS === 400) {
        value.message = 'Invalid Username or Password'
      } else {
        value.message = 'something error call administrator'
      }
      state.errorMsg = value
    },
    setUser: (state, value) => {
      state.User = value
    }
  },
  getters: {
    ROOT_URL: (state) => state.ROOT_URL,
    errorMsg: (state) => state.errorMsg,
    getUser: (state) => state.User
  },
  actions: {
    closeErrorMsg: (context, payload) => {
      context.commit('resetErrorMsg')
    },
    setErrorMsg: (context, payload) => {
      context.commit('setErrorMsg', payload)
    },
    setUser: (context, payload) => {
      context.commit('setUser', payload)
    }
  }
})

export default store
