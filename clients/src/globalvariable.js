import axios from 'axios'
export default{
  ROOT_URL: 'http://localhost:8000',

  restosave (context, creds, redirect) {
    var data = creds
    var pro = []
    let undelf = []
    var formdata = new FormData()
    var formdata2 = new FormData()
    for (var key in data.gal.p) {
      var obj = data.gal.p[key]
      formdata.append('img', obj.file)
    }
    for (key in data.gal.fp) {
      obj = data.gal.fp[key]
      formdata2.append('img', obj.file)
    }
    pro.push(axios.post(`${this.ROOT_URL}/api/saverestoI`, {userid: data.userid, data: data.info}))
    pro.push(axios.post(`${this.ROOT_URL}/api/delrestoF/` + data.userid))
    for (key in data.fac) {
      obj = data.fac[key]
      pro.push(axios.post(`${this.ROOT_URL}/api/saverestoF`, {userid: data.userid, data: obj}))
    }
    pro.push(axios.post(`${this.ROOT_URL}/api/delrestoD/` + data.userid))
    pro.push(axios.post(`${this.ROOT_URL}/api/delmenu/` + data.userid))
    for (key in data.dur) {
      obj = data.dur[key]
      pro.push(axios.post(`${this.ROOT_URL}/api/saverestoD`, {userid: data.userid, data: obj}))
    }
    pro.push(axios.post(`${this.ROOT_URL}/api/delupload/${data.userid}/1`))
    pro.push(axios.post(`${this.ROOT_URL}/api/delupload/${data.userid}/0`))
    pro.push(axios.post(`${this.ROOT_URL}/api/upload/${data.userid}/1`, formdata))
    pro.push(axios.post(`${this.ROOT_URL}/api/upload/${data.userid}/0`, formdata2))
    for (key in data.menu) {
      obj = data.menu[key]
      undelf.push(obj.mp)
      pro.push(axios.post(`${this.ROOT_URL}/api/saverestoM`, {userid: data.userid, data: obj}))
    }
    pro.push(axios.post(`${this.ROOT_URL}/api/delrestoPM/${data.userid}`, {data: undelf}))
    axios.all(pro)
    .then(response => {
      context.snackbar = true
      context.errormsg = 'Save Success'
      context.colors = 'success'
    })
    .catch(() => {
      context.snackbar = true
      context.errormsg = 'Save Failed'
      context.colors = 'error'
    })
  },
  getresto (context, creds, redirect) {
    var getpro = []
    getpro.push(axios.get(`${this.ROOT_URL}/api/getrestoI/` + creds))
    getpro.push(axios.get(`${this.ROOT_URL}/api/getrestoF/` + creds))
    getpro.push(axios.get(`${this.ROOT_URL}/api/getrestoD/` + creds))
    getpro.push(axios.get(`${this.ROOT_URL}/api/getupload/${creds}/1`))
    getpro.push(axios.get(`${this.ROOT_URL}/api/getupload/${creds}/0`))
    getpro.push(axios.get(`${this.ROOT_URL}/api/getrestoM/` + creds))
    axios.all(getpro)
    .then(axios.spread((info, fac, dur, gal, galx, menu) => {
      var infocb = info.data
      var faccb = fac.data.data
      var durcb = dur.data.data
      var galcb = gal.data
      var galxcb = galx.data
      var menucb = menu.data.data
      var tmpf = []
      var tmpfp = []
      var tmp = []
      var tmpd = []
      var tmmenuf = []
      var key
      var obj
      if (galcb.length > 0) {
        for (key in galcb) {
          obj = galcb[key]
          var x = new Blob([new Uint8Array(obj.data.data)])
          let thumb = URL.createObjectURL(x)
          x.lastModifiedDate = new Date()
          x.filename = obj.id
          x.name = obj.name
          var filex = new File([x], obj.name, {type: obj.type, lastModified: Date.now()})
          tmpf.push({thumb: thumb, file: filex, fileid: obj.id})
        }
      }
      if (galxcb.length > 0) {
        for (key in galxcb) {
          obj = galxcb[key]
          x = new Blob([new Uint8Array(obj.data.data)])
          let thumb = URL.createObjectURL(x)
          x.lastModifiedDate = new Date()
          x.filename = obj.id
          x.name = obj.name
          var filexd = new File([x], obj.name, {type: obj.type, lastModified: Date.now()})
          tmpfp.push({thumb: thumb, file: filexd, fileid: obj.id})
        }
      }
      for (key in faccb) {
        obj = faccb[key]
        tmp.push({value: true, name: obj.name, icon: obj.icons})
      }
      for (key in durcb) {
        obj = durcb[key]
        tmpd.push({value: true, min: obj.minute})
      }
      for (key in menucb) {
        obj = menucb[key]
        tmmenuf.push({value: true, name: obj.name, price: obj.price, md: obj.description, mp: obj.picid, mpt: obj.pictype})
      }
      context.$refs.restoinfo.data = infocb.data
      context.$refs.facility.items = tmp
      context.$refs.duration.items = tmpd
      context.$refs.gallery.files = tmpf
      context.$refs.gallery.fin = tmpfp
      context.$refs.gallery.xs = filexd ? filexd.name : ''
      context.$refs.menu.items = tmmenuf
    }))
    .catch((err) => {
      console.log(err)
      context.snackbar = true
      context.errormsg = 'Something Error Contact Admin'
      context.colors = 'error'
    })
  },
  getlistresto (context, creds, redirect) {
    axios.get(`${this.ROOT_URL}/api/getlistresto`)
    .then(res => {
      let arr = res.data.data
      for (var key in arr) {
        var obj = arr[key]
        let x = new Blob([new Uint8Array(obj.pic.data)])
        let thumb = URL.createObjectURL(x)
        context.data.push({
          restoname: obj.data.name,
          restodesc: obj.data.description,
          file: thumb,
          restoid: obj.data.id
        })
      }
    })
    .catch(() => {
      console.log('error')
    })
  },
  getrestodetail (context, creds, redirect) {
    axios.get(`${this.ROOT_URL}/api/getrestodetail/${creds}`)
    .then(res => {
      context.data = res.data.data
      axios.get(`${this.ROOT_URL}/api/getupload/${context.data.parentid}/1`)
      .then(res => {
        let galpic = []
        for (var key in res.data) {
          var obj = res.data[key]
          let xrd = new Blob([new Uint8Array(obj.data.data)])
          let thumbrd = URL.createObjectURL(xrd)
          galpic.push({src: thumbrd.toString()})
        }
        context.glp = galpic
        context.loaded = true
        axios.get(`${this.ROOT_URL}/api/getrestoF/${context.data.parentid}`)
        .then(res => {
          axios.get(`${this.ROOT_URL}/api/getrestoMWP/${context.data.parentid}`)
          .then(res => {
            for (var key in res.data.data) {
              var obj = res.data.data[key]
              let xrd = new Blob([new Uint8Array(obj.pic.data)])
              let thumbrd = URL.createObjectURL(xrd)
              obj.thumb = thumbrd
            }
            context.menu = res.data.data
          })
          .catch(() => {
            console.log('error')
          })
          context.fac = res.data.data
        })
        .catch(() => {
          console.log('error')
        })
      })
      .catch(() => {
        console.log('error')
      })
    })
    .catch(() => {
      console.log('error')
    })
  }
}
