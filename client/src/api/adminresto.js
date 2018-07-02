import axios from 'axios'

export default {
  getTbRestoByID (context, userID) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/getTbRestoByuserID/${userID}`)
  },
  updateTbResto (context, ListData) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbResto`, ListData)
  },
  updateTbRestoMenu (context, ListData, fileId, RestoId) {
    let formdata = new FormData()
    formdata.append('img', ListData.Img)
    return axios.post(`${context.$store.getters.ROOT_URL}/api/upload/${RestoId}/${fileId}`, formdata)
      .then(cb => {
        ListData.src = URL.createObjectURL(ListData.Img)
        delete ListData.Img
        ListData.PID = cb.data.PID
        ListData.Ptype = cb.data.Ptype
        ListData.Pname = cb.data.Pname
        ListData.Id_Resto = RestoId
        return axios.put(`${context.$store.getters.ROOT_URL}/api/updateTbRestoMenu`, ListData)
      })
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
  deleteTbRestoMenu (context, Id) {
    return axios.put(`${context.$store.getters.ROOT_URL}/api/deleteTbRestoMenu/${Id}`)
  }
}
