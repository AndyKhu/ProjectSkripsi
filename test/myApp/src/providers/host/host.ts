import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import axios from 'axios'

/*
  Generated class for the HostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HostProvider {
  link: any;
  constructor(public toastCtrl: ToastController) {
    // this.link = 'http://192.168.43.191:8001';
    // this.link = 'http://192.168.1.240:8001';
    this.link = 'http://localhost:8001'
    // this.link = 'http://172.16.11.60:8001'
    // this.link = 'http://192.168.100.14:8001'
  }

  login(cred){
    return axios.post(`${this.link}/api/login`, cred)
  }

  getListResto(data){
    return axios.post(`${this.link}/api/getListRestourant`, data)
  }

  getReservationHistoryPage(data){
    return axios.post(`${this.link}/api/getReservationHistoryPage`, data)
  }

  getRestoDetail (restoId) {
    return axios.get(`${this.link}/api/getRestoDetail/${restoId}`)
  }

  checkAuth () {
    const token = 'bearer ' + localStorage.getItem('authToken')
    return axios.get(`${this.link}/checkAuth`, {headers: {'Authorization': token}})
  }

  HistoryReservationUpload (data) {
    if (data.src) {
      return this.uploadProfilePicture(data.Id_Reserve, data).then(res => {
        data.oldPID = data.PID
        console.log(data.oldPID)
        data.PID = res.data.PID
        delete data.src
        return axios.post(`${this.link}/api/HistoryReservationUpload`, data)
      })
    }
  }

  cancelReservation (Id) {
    return axios.put(`${this.link}/api/cancelReservation/${Id}`)
  }

  getReservationHistoryOne (Id) {
    return axios.get(`${this.link}/api/getReservationHistoryOne/${Id}`)
  }

  getUserFavorite (Id) {
    return axios.get(`${this.link}/api/getUserFavorite/${Id}`)
  }

  updateFavorite (data) {
    return axios.post(`${this.link}/api/updateFavorite`, data)
  }

  saveRestoReserve (data) {
    return axios.post(`${this.link}/api/saveRestoReserve`, data)
  }

  getReservationHistory (userId) {
    return axios.get(`${this.link}/api/getReservationHistory/${userId}`)
  }

  getProfilePicture (user) {
    return axios.get(`${this.link}/api/getSingleImg/${user.Id}/${user.DpId}`)
  }
  saveRestoReview (data) {
    return axios.post(`${this.link}/api/saveRestoReview`, data)
  }
  updateTbRestoRate (restoId, rate) {
    return axios.put(`${this.link}/api/saveRestoRate/${restoId}/${rate}`)
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  isBase64(data) {
    if(!(data instanceof Object)){
      let str = data.replace('data:image/jpeg;base64,',"")
      try {
        return btoa(atob(str)) == str;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  }

  updateProfile(data) {
    if (data.src && this.isBase64(data.src)) {
      let tmp = data.DpId
      return this.uploadProfilePicture(data.Id, data).then(res => {
        data.DpId = res.data.PID
        data.upload = true
        data.delete = tmp
        return axios.post(`${this.link}/api/updateProfile`, data)
      })
    } else {
      data.upload = false
      return axios.post(`${this.link}/api/updateProfile`, data)
    }
  }

  uploadProfilePicture (userId, data) {
    return axios.post(`${this.link}/api/uploadSingleBase64/${userId}`, data)
  }

  closeAccount (user) {
    return axios.post(`${this.link}/api/closeAccount/${user.Id}`, user)
  }

  changePass (data) {
    return axios.post(`${this.link}/api/changePass`, data)
  }

  signUp (creds) {
    return axios.post(`${this.link}/api/signup`, creds)
  }
}
