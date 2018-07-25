<template>
  <v-app style="background: #FFF">
    <v-container fluid class="pa-0">
      <v-layout row wrap>
        <v-flex xs12 class="nav-top-cst">
          <v-layout row wrap>
            <v-flex xs4 md2 lg2 class="test">
              <v-icon>restaurant_menu</v-icon>
              <router-link class="default" :to="{name: 'Home'}">
              <v-toolbar-title>Rabbito</v-toolbar-title>
              </router-link>
            </v-flex>
            <v-flex xs7 md6 offset-md1 lg6 offset-lg1>
              <div class="cont-filter">
                <div style="width:100%" class="filter">
                  <v-text-field class="pa-0 ma-0" id="searchBox"
                    hide-details
                    v-model="search"
                    placeholder="Search..."
                    @keydown.native="searchC"
                    @input="searchG"
                  ></v-text-field>
                </div>
                <div class="px-2 filter-icon bl-none" @click="toggle">
                  <v-icon>filter_list</v-icon>
                </div>
                <div class="px-2 filter-icon" @click="searchF">
                  <v-icon>search</v-icon>
                </div>
                <div class="filter-item" :class="filterS?'showF':''" id="filterBox">
                  <div class="cst-slider pa-2 px-3">
                    <label>Price Range</label>
                    <v-slider class="pa-0"
                      v-model="price"
                      :max="Max"
                      :step="1000"
                      @input="filterC"
                      hide-details
                    ></v-slider>
                  </div>
                  <div class="cst-slider pa-2 px-3">
                    <label>Max</label>
                    <formNumberField v-model="price" noMargin disabled/>
                  </div>
                  <div class="cst-slider pa-2 px-3">
                    <label>Dinning Style</label>
                    <formComboBox v-model="ds" :Items="dinningItems" noMargin @input="filterC"/>
                  </div>
                </div>
              </div>
            </v-flex>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-flex xs2 class="cst-flex hidden-sm-and-down force-center">
              <v-menu offset-y v-if="getuser()!=null">
                <div slot="activator" class="pr-2">
                  <v-avatar :size="20" class="red darken-1 white--text mx-2 notif" v-if="getuser()!=null && getuser().Reservation && getuser().Reservation.length!== 0 && getuser().Reservation.filter(e => { return e.PID === 'new' }).length">
                    {{getuser().Reservation.filter(e => { return e.PID === 'new' }).length}}
                  </v-avatar>
                  <h3 class="d-inline-block">{{getuser().fullName}}</h3>
                  <v-icon>arrow_drop_down</v-icon>
                </div>
                <v-card tile width="300px">
                  <MenuLink :userId="getuser().Id"/>
                </v-card>
              </v-menu>
              <router-link class="default" :to="{name: 'Login'}" v-else>
                <h3 class="d-inline-block pr-2">Login</h3>
              </router-link>
            </v-flex>
            <v-flex xs1 md2 lg2 class="hidden-md-and-up force-center">
              <v-icon v-if="getuser()!=null" @click="nav = true">menu</v-icon>
              <router-link class="default" :to="{name: 'Login'}" v-else>
                <v-icon>input</v-icon>
              </router-link>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-snackbar
          top
          :timeout="2500"
          :color="getdialogMsg().color"
          v-model="getdialogMsg().status"
        >
          {{ getdialogMsg().txtmsg }}
          <v-btn small flat color="white" @click.native="getdialogMsg().status = false">Close</v-btn>
        </v-snackbar>
        <router-view class="container-cst"/>
        <v-navigation-drawer v-if="getuser() !== null"
          temporary
          fixed
          v-model="nav"
          class="nav-cst"
          >
          <MenuLink :userId="getuser().Id"/>
        </v-navigation-drawer>
        <div class="cst-dialog-cont front" v-if="getdialogMsg2().status">
          <div class="button-cont front">
            <v-btn icon small color="white" @click="close"><v-icon>close</v-icon></v-btn>
            <div class="cst-dialog-item force-center">
              <img :src="getdialogMsg2().src" alt="">
            </div>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import MenuLink from '@/components/helper/menu.vue'
import Member from '@/api/member.js'
import _ from 'lodash'
export default {
  components: {
    MenuLink
  },
  data () {
    return {
      price: 0,
      ds: '-',
      nav: false,
      navactive: false,
      filterS: false,
      Max: 500000,
      search: '',
      filter1: 'All',
      filteritem: ['All', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      dinningItems: ['-', 'Casual Dinning', 'Family Style', 'Fine Dinning', 'Fast Food', 'Fast Casual Dinning']
    }
  },
  mounted () {
    Member.getMaxValueResto(this).then(cb => {
      this.max = cb.data[0].PriceEnd
    })
  },
  methods: {
    getdialogMsg2 () {
      return this.$store.getters['getadminDialog']
    },
    close () {
      this.$store.dispatch('setAdminDialog', {
        status: false,
        src: 'http://via.placeholder.com/90x90'
      })
    },
    toggle () {
      if (this.filterS) {
        return this.hide()
      }
      return this.show()
    },
    show () {
      this.filterS = true
      setTimeout(() => document.addEventListener('click', this.hide), 0)
    },
    hide (e) {
      let parent = document.getElementById('filterBox')
      let searchBox = document.getElementById('searchBox')
      if (e && (e.target === parent || this.isChildOf(e.target, parent) || e.target === searchBox)) {
        // do nothing
      } else {
        this.filterS = false
        document.removeEventListener('click', this.hide)
      }
    },
    isChildOf (child, parent) {
      if (child.parentNode === parent) {
        return true
      } else if (child.parentNode === null) {
        return false
      } else {
        return this.isChildOf(child.parentNode, parent)
      }
    },
    reinit () {
      this.price = 0
      this.ds = '-'
    },
    filterC: _.debounce(
      function (value) {
        this.search = ''
        let tmp = this.price.toString() + '#?' + (this.ds === '' ? '-' : this.ds)
        this.$router.push({name: 'SearchResto', params: {search: tmp, type: 1}})
        // this.filterS = false
        // document.removeEventListener('click', this.hide)
      }, 500
    ),
    searchC (event) {
      if (event.keyCode === 13) {
        if (this.search === '') {
          this.$router.push({name: 'Home'})
        } else {
          this.$router.push({name: 'SearchResto', params: {search: this.search, type: 0}})
          this.reinit()
        }
        this.filterS = false
        document.removeEventListener('click', this.hide)
      }
    },
    searchG: _.debounce(
      function (value) {
        if (value === '') {
          this.$router.push({name: 'Home'})
          this.filterS = false
          document.removeEventListener('click', this.hide)
        }
      }, 1000
    ),
    searchF () {
      if (this.search === '') {
        this.$router.push({name: 'Home'})
      } else {
        this.$router.push({name: 'SearchResto', params: {search: this.search, type: 0}})
        this.reinit()
      }
      this.filterS = false
      document.removeEventListener('click', this.hide)
    },
    signOut () {
      localStorage.removeItem('authToken')
    },
    getuser () {
      return this.$store.getters['getUser']
    },
    getdialogMsg () {
      return this.$store.getters['getdialogMsg']
    }
  }
}
</script>
<style scoped>
@media only screen and (max-width: 960px){
  .nav-cst{
    /* margin-top: 120px !important; */
  }
}
@media only screen and (max-width: 564px){
  .nav-cst{
    /* margin-top: 120px !important; */
  }
  .cst-dialog-item img, .body-container >>> .cst-dialog-item img{
    max-width: 320px !important;
    max-height: 540px !important;
  }
}
.filter,.test{
  /* padding: 0 100px; */
  display: flex;
}
.bl-none{
  border-right: none !important;
}
.showF{
  border-bottom: 1px solid #dedede !important;
  height: 200px !important;
}
.test{
  justify-content: center;
}
.cst-flex {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
.filter-icon{
  display:flex;
  align-items:center;
  justify-content: center;
  width:35px;
  border: 1px solid #dedede;
  cursor:pointer;
  background:#ffffff;
  min-height:32px;
}
.filter-icon:hover{
  background: #f8f8f8;
}
.cont-filter{
  display:flex;
  width:100%;
  position:relative;
}
.filter >>> .input-group{
  background: #e0e0e0;
  margin: 0 10px;
}
.filter >>> input{
  padding: 0 15px;
  color: #424242 !important;
  font-size: 13px;
}
.filter >>> .input-group__selections{
  justify-content: center;
}
.filter >>> .input-group__selections__comma{
  color: #424242 !important;
}
.filter >>> .input-group__details{
  visibility:hidden;
}
.primary{
  background-color: #1867c0 !important
}
.nav-cst{
  margin-top: 55px;
}
.nav-top-cst{
  display: flex;
  align-items: center;
  height: 85px;
  border-top: 3px solid #F44336;
  box-shadow:none;
  border-bottom: 1px solid #dedede;
  background-color: #FFFFFF !important;
  /* padding: 0 20px; */
  /* z-index: 999; */
}
.default{
  all:unset;
}
.filter-item{
  z-index: 999;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #dedede;
  border-bottom: none;
  height: 0;
  border-top: none;
  overflow: hidden;
  -webkit-transition: height 0.5s ease; /* Safari */
  transition: height 0.5s ease;
}
.cst-slider{
  display: flex;
  align-items: center;
  flex-direction: row;
}
.cst-slider label{
  width: 100px;
  color: #616161;
  margin-right: 20px;
  font-size: 16px;
}
.cst-dialog-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.33);
}
.front{
  z-index: 999;
}
.cst-dialog-item img, .body-container >>> .cst-dialog-item img{
  max-width: 780px;
  max-height: 580px;
}
.button-cont{
  position: relative;
}
.button-cont button{
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
