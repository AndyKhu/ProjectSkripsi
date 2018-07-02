import axios from 'axios'
export default {
  getTbRequestAdminInProgres (context) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getReqAdminResto`)
  },
  getTbUserAll (context) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getTbUserAll`)
  },
  // update
  updateTbUser (context, data) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbUser`, data)
  },
  ApproveRequestAdmin (context, data) {
    delete data.Img
    return axios.put(`${context.$store.getters.ROOT_URL}/api/ApproveReqAdmin`, data)
  },
  RejectRequestAdmin (context, data) {
    delete data.Img
    return axios.put(`${context.$store.getters.ROOT_URL}/api/RejectReqAdmin`, data)
  }
}
