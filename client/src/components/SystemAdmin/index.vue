<template>
<v-app>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12 class="nav-cst">
        <v-layout row wrap>
          <v-flex xs1 class="nav-item nav-title">
            <div class="nav-item-sub-cont">
              <v-icon x-large dark>restaurant_menu</v-icon>
              <div class="nav-item-sub">Rabbito</div>
            </div>
          </v-flex>
          <v-flex v-for="(item,i) in menu" :key="i" xs1 class="nav-item" @click="changeclass(item)" :class="item.active?'nav-active':''">
            <router-link class="front full-div white--text" :to="{name: item.linkname}">
              <div class="nav-item-sub-cont">
                <v-icon x-large dark>{{item.icon}}</v-icon>
                <div class="nav-item-sub">{{item.title}}</div>
              </div>
            </router-link>
          </v-flex>
          <v-flex xs1 class="nav-item" @click="signOut">
            <div class="nav-item-sub-cont">
              <v-icon x-large dark>power_settings_new</v-icon>
              <div class="nav-item-sub">Log Out</div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10 offset-xs1 class="body-container">
        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
  <div class="cst-dialog-cont" v-if="getdialogMsg().status">
    <div class="button-cont">
      <v-btn icon small color="white" @click="close"><v-icon>close</v-icon></v-btn>
      <div class="cst-dialog-item force-center">
        <img :src="getdialogMsg().src" alt="">
      </div>
    </div>
  </div>
</v-app>
</template>
<script>
import reqAdmin from '@/components/SystemAdmin/reqAdmin.vue'
export default {
  components: {
    reqAdmin
  },
  data: () => ({
    menu: [
      { Id: 0, icon: 'notifications', title: 'Request AdminResto', active: true, linkname: 'ReqAdmin' },
      { Id: 1, icon: 'account_circle', title: 'Account', active: false, linkname: 'AccountM' },
      { Id: 2, icon: 'business', title: 'Resto', active: false, linkname: 'ViewResto' },
      { Id: 3, icon: 'forum', title: 'Reviews', active: false, linkname: 'Reviews' }],
    items: []
  }),
  methods: {
    changeclass (value) {
      this.menu.filter((e) => { return e.active })[0].active = false
      this.menu.filter((e) => { return e.title === value.title })[0].active = true
    },
    signOut () {
      this.$store.dispatch('setUser', null)
      localStorage.removeItem('authToken')
      this.$router.push('/')
    },
    getdialogMsg () {
      return this.$store.getters['getadminDialog']
    },
    close () {
      this.$store.dispatch('setAdminDialog', {
        status: false,
        src: 'http://via.placeholder.com/90x90'
      })
    }
  }
}
</script>
<style>
.nav-cst{
  /* #8465e8 */
  background: #757575;
  color: #ffffff;
  position: fixed;
  height: 85px;
  left: 0;
  right: 0;
}
.nav-title{
  background: #4CAF50 !important;
  font-size: 18px !important;
}
.nav-item{
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* border-right: 1px solid #dedede; */
  height: 85px;
}
.nav-item-sub-cont{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.nav-item:first-child{
  border:none;
}
.tooltip-cont{
  position: relative;
}
.cst-disable{
  box-shadow: none!important;
  pointer-events: none;
}
.nav-item-sub{
  text-align: center;
  margin:5px 0;
}
.card-search{
  justify-content: flex-end;
}
.nav-item:hover{
  background: #616161;
}
.nav-active{
  background: #424242
}
.nav-item:last-child{
  position: absolute;
  right: 0;
  /* border-left: 1px solid #dedede; */
}
.body-container{
  margin-top: 85px;
  padding: 20px 0;
}
.card-content{
  border-top: 2px solid #F44336;
}
.item-tittle{
  display: flex;
  align-items: center;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
  position: relative;
  height: 48px;
}
.card-item{
  padding: 20px;
}
.table-cst{
  border:1px solid #dedede;
}
.tp-activator:hover + .tooltip-cst{
  opacity: 1;
}
.front{
  z-index: 999;
}
.tooltip-cst{
  padding: 5px;
  background: rgb(53, 52, 52);
  color: #ffffff;
  font-size: 12px;
  position: absolute;
  bottom: -15px;
  left: -10px;
  opacity: 0;
}
.table-cst th:first-child{
  border-right: none;
}
.table-cst th.column{
  font-weight: bold;
  border-bottom: 1px solid #dedede;
}
.table-cst .datatable__progress th.column{
  border-bottom: none;
}
.cst-dialog-cont{
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
.cst-dialog-item{
  width: 800px;
  height: 600px;
  background: #1a1a1a;
  box-shadow: -1px 3px 12px -1px rgba(0,0,0,0.75);
  border-radius: 5px;
}
.button-cont{
  position: relative;
}
.button-cont button{
  position: absolute;
  right: 5px;
  top: 5px;
}
.cst-dialog-item img{
  max-width: 780px;
  max-height: 580px;
}
.card-search .input-group{
  background: #FFCDD2;
  margin: 0 10px;
}
.card-search input{
  font-weight: normal;
  font-size: 13px;
  padding: 10px;
  color: #6d4c41 !important;
}
.card-search .input-group__selections{
  justify-content: center;
}
.card-search .input-group__selections__comma{
  color: #6d4c41 !important;
}
.card-search .input-group__details:after, .input-group__details:before{
  content: none;
}
.full-div{
  width: 100%;
  height: 100%;
}
.default{
  all:unset;
}
.cst-dialog-item-title{
  padding: 0 15px;
  font-size: 16px;
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #dedede;
}
.cst-form-textfield{
  display: inline-flex;
  align-items: center;
  padding: 0 25px;
  width: 49.7%;
}
.cst-form-textfield label{
  font-size: 16px;
  width: 100px;
}
.cst-form-textfield input{
  border:1px solid #A0A0A0;
  font-weight: normal;
  font-size: 13px;
  padding: 10px;
  color: #424242 !important;
}
.cst-seperator{
  margin: 0 20px;
}
.cst-form-textfield .input-group__selections{
  justify-content: center;
}
.cst-form-textfield .input-group__details:after, .input-group__details:before{
  content: none;
}
.cst-dialog-item-footer{
  text-align: right;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 20px;
  height: 50px;
  padding: 0 25px;
  width: 100%;
}
.cst-dialog-item-footer button{
  position: relative;
}
</style>
