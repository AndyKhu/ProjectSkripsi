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
    adminDialog: {
      status: false,
      src: 'http://via.placeholder.com/90x90'
    },
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
        value.message = 'You have no access to this link'
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
    },
    setadminDialog: (state, value) => {
      state.adminDialog = value
    }
  },
  getters: {
    ROOT_URL: (state) => state.ROOT_URL,
    errorMsg: (state) => state.errorMsg,
    getUser: (state) => state.User,
    getdialogMsg: (state) => state.dialogMsg,
    getadminDialog: (state) => state.adminDialog
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
    },
    setAdminDialog: (context, payload) => {
      context.commit('setadminDialog', payload)
    }
  }
})

export default store
