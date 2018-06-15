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
  saveResto (context, data) {
    for (let item in data.Tb_Resto_Facs) {
      data.Tb_Resto_Facs[item].Id = guid()
    }
    data.Id = guid()
    return axios.post(`${context.$store.getters.ROOT_URL}/api/save/resto`, data)
      .then(res => {
        context.User.userResto = res.data
        context.User.userResto.Tb_Resto_Menus = []
        context.setSuccess()
      }).catch((res) => {
        context.setError()
      })
  },
  updateResto (context, data) {
    for (let item in data.Tb_Resto_Facs) {
      if (data.Tb_Resto_Facs[item].Id === null || data.Tb_Resto_Facs[item].Id === undefined) {
        data.Tb_Resto_Facs[item].Id = guid()
      }
      if (data.Tb_Resto_Facs[item].Id_Resto === null || data.Tb_Resto_Facs[item].Id_Resto === undefined) {
        data.Tb_Resto_Facs[item].Id_Resto = data.Id
      }
    }
    return axios.put(`${context.$store.getters.ROOT_URL}/api/update/resto`, data)
      .then(res => {
        console.log(res)
        context.setSuccess()
      }).catch((res) => {
        context.setError()
      })
  },
  uploadFile (context, data, deleted) {
    if (data.Tb_Galleries !== undefined && data.Tb_Galleries !== null) {
      let formdata = new FormData()
      for (let item in data.Tb_Galleries) {
        if (data.Tb_Galleries[item].Id === null || data.Tb_Galleries[item].Id === undefined) {
          let file = data.Tb_Galleries[item].file
          formdata.append('img', file)
        }
      }
      return axios.post(`${context.$store.getters.ROOT_URL}/api/img/upload/${data.Id}/0`, formdata)
        .then(res => {
          if (deleted.length !== 0) {
            axios.post(`${context.$store.getters.ROOT_URL}/api/delete/upload/${data.Id}/0`, deleted)
          }
          let updatedF = data.Tb_Galleries.filter((obj) => { return obj.Id === undefined || obj.Id === null })
          for (let n in updatedF) {
            let returnf = res.data.file.filter((obj) => { return obj.Pname === updatedF[n].file.name })[0]
            updatedF[n].Id = returnf.Id
            updatedF[n].fileId = returnf.PID
          }
        }).catch(res => {
          console.log(res)
        })
    } else {
      data.Tb_Galleries = []
    }
  },
  getImagebyId (context, data) {
    return axios.post(`${context.$store.getters.ROOT_URL}/api/get/imgbyid/${data.Id}/${data.Type}/${data.fileId}`)
  },
  getImage (context, data) {
    if (data.Tb_Galleries.length !== 0 && data.Tb_Galleries[0].PID !== undefined && data.Tb_Galleries[0] !== null) {
      return axios.post(`${context.$store.getters.ROOT_URL}/api/getupload/${data.Id}`, data.Tb_Galleries)
        .then(res => {
          let a = []
          for (let n in res.data) {
            let x = new Blob([new Uint8Array(res.data[n].data.data)])
            let cf = new File([x], res.data[n].name, {lastModified: new Date(0), type: res.data[n].type})
            a.push({
              Id: res.data[n].id,
              fileId: res.data[n].PID,
              file: cf
            })
          }
          context.User.userResto.Tb_Galleries = a
          context.loaded = true
        }).catch(res => {
          console.log(res)
        })
    } else {
      context.loaded = true
    }
  },
  getImageMenu (context, data) {
    context.loaded = false
    if (data.Tb_Resto_Menus.length !== 0 && data.Tb_Resto_Menus[0].PID !== undefined && data.Tb_Resto_Menus[0] !== null) {
      return axios.post(`${context.$store.getters.ROOT_URL}/api/getuploadMenu/${data.Id}`, data.Tb_Resto_Menus)
        .then(res => {
          let a = []
          for (let n in res.data) {
            let x = new Blob([new Uint8Array(res.data[n].Img.data)])
            let cf = new File([x], res.data[n].Pname, {lastModified: new Date(0), type: res.data[n].Ptype})
            res.data[n].Img = cf
            a.push(res.data[n])
          }
          context.User.userResto.Tb_Resto_Menus = a
          context.loaded = true
        }).catch(res => {
          console.log(res)
        })
    } else {
      context.loaded = true
    }
  },
  loadListResto (context) {
    return axios.get(`${context.$store.getters.ROOT_URL}/api/get/listrestourant`)
      .then(res => {
        // console.log(res)
        context.item = res.data.item
        console.log(context.item)
      }).catch(res => {
        console.log(res)
      })
  }
}
