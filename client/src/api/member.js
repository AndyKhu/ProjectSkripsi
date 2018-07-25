import axios from 'axios'
export default {
  loadListResto (context, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/getListRestourant`, data)
  },
  loadListRestoTrending (context) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getListRestourantTrending`)
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
  getReservationHistory2 (context, userId) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getReservationHistory2/${userId}`)
  },
  getProfilePicture (context, user) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getSingleImg/${user.Id}/${user.DpId}`)
  },
  getUserFavorite (context, user) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getUserFavorite/${user.Id}`)
  },
  getMaxValueResto (context) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/maxValueResto`)
  },
  getListBank (context, restoId) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getListBank/${restoId}`)
  },
  getHistoryReserverById (context, Id) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getHistoryReserverById/${Id}`)
  },
  HistoryReservationUpload (context, data) {
    if (data.Attachment) {
      let formdata = new FormData()
      formdata.append('img', data.Attachment)
      return axios.post(`${context.$store.getters.ROOT_URL}/api/upload/${data.Id_Reserve}/null`, formdata).then(cb => {
        data.oldPID = data.PID
        data.PID = cb.data.PID
        delete data.Attachment
        return axios.post(`${context.$store.getters.ROOT_URL}/api/HistoryReservationUpload`, data)
      })
    } else {
      return axios.post(`${context.$store.getters.ROOT_URL}/api/HistoryReservationUpload`, data)
    }
  },
  cancelReservation (context, Id) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/cancelReservation/${Id}`)
  },
  updateNotif (context, userId) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateNotif/${userId}`)
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
  closeAccount (context, user) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/closeAccount/${user.Id}`, user)
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
