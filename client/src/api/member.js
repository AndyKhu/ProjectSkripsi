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
  },
  getReservationHistory (context, userId) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getReservationHistory/${userId}`)
  },
  getProfilePicture (context, user) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getSingleImg/${user.Id}/${user.DpId}`)
  },
  updateTbRestoRate (context, restoId, rate) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/saveRestoRate/${restoId}/${rate}`)
  },
  saveRestoReview (context, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/saveRestoReview`, data)
  },
  saveRestoReserve (context, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/saveRestoReserve`, data)
  },
  updateFavorite (context, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/updateFavorite`, data)
  },
  updateProfile (context, data, dp) {
    if (dp !== null) {
      let tmp = data.DpId
      return this.uploadProfilePicture(context, data.Id, dp).then(res => {
        data.DpName = res.data.Pname
        data.DpId = res.data.PID
        data.DpType = res.data.Ptype
        data.upload = true
        data.delete = tmp
        return axios.post(`${context.$store.getters.ROOT_URL}/api/updateProfile`, data)
      })
    } else {
      data.upload = false
      return axios.post(`${context.$store.getters.ROOT_URL}/api/updateProfile`, data)
    }
  },
  uploadProfilePicture (context, userId, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/uploadSingle/${userId}`, data)
  },
  changePass (context, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/changePass`, data)
  }
}
