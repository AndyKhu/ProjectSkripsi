// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import moment from 'moment'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import timePicker from '@/components/helper/formComponent/timePicker.vue'
import formTextField from '@/components/helper/formComponent/formTextField.vue'
import formNumberField from '@/components/helper/formComponent/numberTextField.vue'
import formNumberingSeats from '@/components/helper/formComponent/formNumberingSeats.vue'
import formComboBox from '@/components/helper/formComponent/formComboBox.vue'
import formPR from '@/components/helper/formComponent/priceRangeTextField.vue'
import formDR from '@/components/helper/formComponent/dayRangeTextField.vue'
import formTR from '@/components/helper/formComponent/timeRangeTextField.vue'
import formUploadImg from '@/components/helper/formComponent/formUploadImg.vue'
import StarRating from 'vue-star-rating'
import numformat from '@/assets/js/accounting.min.js'

Vue.use(Vuetify)
Vue.component('formTextField', formTextField)
Vue.component('formPR', formPR)
Vue.component('formDR', formDR)
Vue.component('formTR', formTR)
Vue.component('timePicker', timePicker)
Vue.component('formComboBox', formComboBox)
Vue.component('formNumberField', formNumberField)
Vue.component('formNumberingSeats', formNumberingSeats)
Vue.component('formUploadImg', formUploadImg)
Vue.component('star-rating', StarRating)

Vue.filter('getDay', function (value) {
  if (!value) return ''
  let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return day[value - 1]
})
Vue.filter('NormalTime', function (value) {
  if (!value) return ''
  return moment(value).format('HH:mm')
})
Vue.filter('formatDate', function (value) {
  if (!value) return ''
  return moment(value).format('DD MMM YYYY')
})
Vue.filter('menitToHours', function (value) {
  if (!value) return ''
  if (value % 60 === 0) return parseInt(value / 60) + ' Hours '
  return parseInt(value / 60) + ' Hours ' + (value % 60) + ' Minute'
})
Vue.filter('formatDateTime', function (value) {
  if (!value) return ''
  return moment(value).format('DD MMM YYYY HH:mm')
})
Vue.filter('formatPrice', function (value) {
  if (!value) return '0'
  return numformat.formatNumber(parseInt(value), 0, '.', ',')
})

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAR)) {
    checkAuth(to, from, next, 'AR')
  }
  if (to.matched.some(record => record.meta.requireSA)) {
    checkAuth(to, from, next, 'SA')
  }
  if (to.matched.some(record => record.meta.requireM)) {
    checkAuth(to, from, next, 'M')
  }
  if (to.matched.some(record => record.meta.checksAuth)) {
    checkAuth(to, from, next, '-')
  }
  next()
})
function checkAuth (to, from, next, type) {
  const token = 'bearer ' + localStorage.getItem('authToken')
  axios.get(`${store.getters.ROOT_URL}/checkAuth`, {headers: {'Authorization': token}})
    .then(res => {
      store.dispatch('setUser', res.data.user)
      if (type === 'AR') {
        if (res.data.user.Type === 'AdminResto') {
          next()
        } else {
          store.dispatch('setErrorMsg', {codeS: 999, type: 'error'})
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      } else if (type === 'SA') {
        if (res.data.user.Type === 'SYSTEM') {
          next()
        } else {
          store.dispatch('setErrorMsg', {codeS: 999, type: 'error'})
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      } else if (type === 'M') {
        if (res.data.user.Type === 'Member') {
          next()
        } else {
          store.dispatch('setErrorMsg', {codeS: 999, type: 'error'})
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      } else {
        if (res.data.user.Type === 'AdminResto') {
          next({
            name: 'AdminResto',
            query: { redirect: to.fullPath }
          })
        } else if (res.data.user.Type === 'SYSTEM') {
          next({
            name: 'ReqAdmin',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      }
    }).catch(() => {
      if (type === '-') {
        next()
      } else {
        store.dispatch('setErrorMsg', {codeS: 999, type: 'error'})
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
