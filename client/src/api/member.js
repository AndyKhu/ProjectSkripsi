import axios from 'axios'
export default {
  loadListResto (context) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getListRestourant`)
  },
  getRestoDetail (context, restoId) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getRestoDetail/${restoId}`)
  },
  getRestoDetailmin (context, restoId) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getRestoDetailmin/${restoId}`)
  }
}
