import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { Resto } from '../../models/resto'
import { DomSanitizer } from '@angular/platform-browser';
import { RestoDetailPage } from '../resto-detail/resto-detail'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dataResto: Array<Resto>
  totalPage: any
  search: any
  type: any
  page: number
  ds: any = '-'
  filterS: boolean = false
  rangevalue: rangeClass = {lower: 0, upper: 1000}
  dinningItems: any = ['-', 'Casual Dinning', 'Family Style', 'Fine Dinning', 'Fast Food', 'Fast Casual Dinning']
  constructor(public sanitizer: DomSanitizer, public navCtrl: NavController,public hostService: HostProvider) {
    this.page = 1
    this.type = 0
    let data = {
      page: this.page,
      type: this.type
    }
    hostService.getListResto(data).then(cb => {
      this.totalPage = cb.data.pages
      this.dataResto = cb.data.result
      this.dataResto.forEach((val, index) => {
        val.Gallery.forEach((gal, index) => {
          let x = new Blob([new Uint8Array(gal.file.data)])
          val.src = URL.createObjectURL(x)
        })
        delete val.Gallery
      })
    })
  }

  toDetail (p) {
    this.navCtrl.push(RestoDetailPage,{Id: p.Id})
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    let data = {
      page: this.page,
      type: this.type,
      search: this.search
    }
    this.hostService.getListResto(data).then(cb => {
      this.totalPage = cb.data.pages
      cb.data.result.forEach((val, index) => {
        val.Gallery.forEach((gal, index) => {
          let x = new Blob([new Uint8Array(gal.file.data)])
          val.src = URL.createObjectURL(x)
        })
        delete val.Gallery
      })
      this.dataResto = this.dataResto.concat(cb.data.result)  
      infiniteScroll.complete()
    })
  }

  getItems(ev: any) {
    if (ev.keyCode === 13) {
      this.page = 1;
      this.type = 1
      let data = {
        page: this.page,
        type: this.type,
        search: this.search
      }
      this.hostService.getListResto(data).then(cb => {
        this.totalPage = cb.data.pages
        cb.data.result.forEach((val, index) => {
          val.Gallery.forEach((gal, index) => {
            let x = new Blob([new Uint8Array(gal.file.data)])
            val.src = URL.createObjectURL(x)
          })
          delete val.Gallery
        })
        this.dataResto = cb.data.result
      })
    }
  }
  reset (ev:any) {
    if (!ev || !ev.target.value || ev.target.value.trim() === '') {
      this.page = 1
      this.type = 0
      let data = {
        page: this.page,
        type: this.type
      }
      this.hostService.getListResto(data).then(cb => {
        this.totalPage = cb.data.pages
        this.dataResto = cb.data.result
        this.dataResto.forEach((val, index) => {
          val.Gallery.forEach((gal, index) => {
            let x = new Blob([new Uint8Array(gal.file.data)])
            val.src = URL.createObjectURL(x)
          })
          delete val.Gallery
        })
      })
      this.ds = '-'
      this.rangevalue = {lower: 0, upper: 1000}
    }
  }
  filter () {
    // page: this.page,
    // type: 2,
    // price: parseInt(tmps[0]),
    // priceE: parseInt(tmps[1]),
    // ds: tmp[1]
    this.page = 1
    this.type = 2
    let data = {
      page: this.page,
      type: this.type,
      price: this.rangevalue.lower,
      priceE: this.rangevalue.upper,
      ds: this.ds
    }
    this.hostService.getListResto(data).then(cb => {
      this.totalPage = cb.data.pages
      cb.data.result.forEach((val, index) => {
        val.Gallery.forEach((gal, index) => {
          let x = new Blob([new Uint8Array(gal.file.data)])
          val.src = URL.createObjectURL(x)
        })
        delete val.Gallery
      })
      this.dataResto = cb.data.result
    })
  }
}
class rangeClass {
  lower: any
  upper: any
}