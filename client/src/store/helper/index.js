const helper = {
  namespaced: true,
  state: {
    saveD: {
      actions: false,
      next: null
    }
  },
  mutations: {
    setSaveD: (state, value) => { state.saveD = value }
  },
  getters: {
    saveD: (state) => state.saveD
  },
  actions: {
    setSaveD: (context, payload) => {
      context.commit('setSaveD', payload)
    }
  }
}

export default helper
