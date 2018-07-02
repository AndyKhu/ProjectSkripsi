import axios from 'axios'
function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
export default {
  saveMenu (context, data, restoId) {
    let ImgId = guid()
    let saveD = {
      Id: guid(),
      Name: data.Name,
      Price: data.Price,
      Description: data.Description,
      Type: data.Type,
      PID: ImgId,
      Pname: data.Img.name,
      Ptype: data.Img.type,
      Id_Resto: restoId
    }
    let formdata = new FormData()
    formdata.append('img', data.Img)
    return axios.post(`${context.$store.getters.ROOT_URL}/api/save/restoMenu`, saveD)
      .then(res => {
        axios.post(`${context.$store.getters.ROOT_URL}/api/imgm/upload/${restoId}/1/${ImgId}`, formdata)
          .then(res => {
            context.form = saveD
            context.form.Img = data.Img
            context.data.push(context.form)
            context.isedit = true
            context.setSuccess()
          }).catch((res) => {
            context.setError()
          })
      }).catch((res) => {
        context.setError()
      })
  },
  deleteMenu (context, data) {
    let tmpId = data.Id
    return axios.post(`${context.$store.getters.ROOT_URL}/api/del/restoMenu`, data)
      .then(res => {
        const index = context.data.map(e => e.Id).indexOf(tmpId)
        context.form =
        {
          Name: null,
          Price: null,
          Img: null,
          Type: null,
          Description: null
        }
        context.data.splice(index, 1)
        context.$store.dispatch('setDialogMsg', {
          txtmsg: 'Delete Success',
          status: true,
          color: 'green'
        })
        context.active = true
      }).catch((res) => {
        context.setError()
      })
  }
}
