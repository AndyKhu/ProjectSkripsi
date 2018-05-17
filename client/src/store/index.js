import Vue from 'vue'
import Vuex from 'vuex'
import Helper from './helper'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Helper
  },
  state: {
    ROOT_URL: 'http://localhost:8001',
    errorMsg: null,
    User: null,
    dialogMsg: {
      txtmsg: '',
      status: false,
      color: 'error'
    }
  },
  mutations: {
    resetErrorMsg: (state, value) => {
      state.errorMsg = null
    },
    setErrorMsg: (state, value) => {
      if (value.codeS === 401 || value.codeS === 400) {
        value.message = 'Invalid Username or Password'
      } else if (value.codeS === 999) {
        value.message = 'Login Session Expired'
      } else {
        value.message = 'something error call administrator'
      }
      state.errorMsg = value
    },
    setUser: (state, value) => {
      state.User = value
    },
    setdialogMsg: (state, value) => {
      state.dialogMsg = value
    }
  },
  getters: {
    ROOT_URL: (state) => state.ROOT_URL,
    errorMsg: (state) => state.errorMsg,
    getUser: (state) => state.User,
    getdialogMsg: (state) => state.dialogMsg
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
    },
    setDialogMsg: (context, payload) => {
      context.commit('setdialogMsg', payload)
    }
  }
})

export default store
