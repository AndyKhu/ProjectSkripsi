import axios from 'axios'

export default {
  getTbRestoByID (context, userID) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getTbRestoByuserID/${userID}`)
  },
  getTbRestoByIDmin (context, userID) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getTbRestoByuserIDmin/${userID}`)
  },
  getCountReservasi (context, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/getCountReservasi`, data)
  },
  getTbReservationConfirm (context, restoId) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getTbReservationConfirm/${restoId}`).then(cb => {
      cb.data.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        let showImg = URL.createObjectURL(x)
        val.src = showImg
        delete val.file
      })
      return cb
    })
  },
  getTbReservationSchedule (context, date) {
    let data = {
      date: date
    }
    return axios.post(`${context.$store.getters.ROOT_URL}/api/getTbReservationSchedule`, data).then(cb => {
      return cb
    })
  },
  getTbReservationSchedule2 (context, date) {
    let data = {
      date: date
    }
    return axios.post(`${context.$store.getters.ROOT_URL}/api/getTbReservationSchedule2`, data).then(cb => {
      return cb
    })
  },
  updateTbReservationSchedule (context, data) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbReservationSchedule/${data.Reservation.Id}/${data.Id}`)
  },
  updateTbReservationConfirm (context, ReserveId, status) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbReservationConfirm/${ReserveId}/${status ? 2 : 4}`)
  },
  updateTbResto (context, ListData) {
    let tmp = JSON.parse(JSON.stringify(ListData))
    delete tmp.FoodMenu
    delete tmp.Gallery
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbResto`, tmp)
  },
  getFoodImage (context, restoId, PID) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getSingleImg/${restoId}/${PID}`)
  },
  updateRestoReview (context, Id) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateRestoReview/${Id}`)
  },
  updateTbRestoMenu (context, ListData, fileId, RestoId) {
    if (ListData.Img) {
      let formdata = new FormData()
      formdata.append('img', ListData.Img)
      if (ListData.Id) {
        let oldPID = ListData.PID
        ListData.oldPID = oldPID
      }
      return axios.post(`${context.$store.getters.ROOT_URL}/api/upload/${RestoId}/${fileId}`, formdata)
        .then(cb => {
          ListData.PID = cb.data.PID
          ListData.Ptype = cb.data.Ptype
          ListData.Pname = cb.data.Pname
          ListData.Id_Resto = RestoId
          return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbRestoMenu`, ListData)
        })
    } else {
      ListData.Id_Resto = RestoId
      return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbRestoMenu`, ListData)
    }
  },
  updateTbRestoGallery (context, ListData, RestoId) {
    let formdata = new FormData()
    ListData.forEach((val, index) => {
      formdata.append('img', val)
    })
    return axios.post(`${context.$store.getters.ROOT_URL}/api/upload/${RestoId}`, formdata)
  },
  setTbRestoGalleryNormal (context, ListId) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbRestoGalleryNormal`, ListId)
  },
  setTbRestoGallery (context, item) {
    delete item.file
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbRestoGallery`, item)
  },
  deleteTbRestoGallery (context, item) {
    delete item.file
    return axios.put(`${context.$store.getters.ROOT_URL}/api/deleteTbRestoGallery`, item)
  },
  deleteTbRestoMenu (context, Id, PID, RestoId) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/deleteTbRestoMenu/${Id}/${PID}/${RestoId}`)
  }
}
