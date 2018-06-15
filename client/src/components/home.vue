<template>
  <v-app>
    <v-toolbar fixed color="primary" dark class="white--text nav-top-cst">
        <v-icon>restaurant_menu</v-icon>
        <router-link class="default" :to="{name: 'ListResto'}">
        <v-toolbar-title>Rabbito</v-toolbar-title>
        </router-link>
      <v-spacer></v-spacer>
      <v-menu offset-y class="hidden-sm-and-down">
        <div slot="activator" class="pr-2">
          <h3 class="d-inline-block">{{getuser()==null?"":getuser().fullName}}</h3>
          <v-icon>arrow_drop_down</v-icon>
        </div>
        <v-card tile width="300px">
          <MenuLink/>
        </v-card>
      </v-menu>
      <div class="hidden-md-and-up">
        <v-icon @click="nav = !nav">menu</v-icon>
      </div>
    </v-toolbar>
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
    <v-navigation-drawer
      temporary
      fixed
      v-model="nav"
      class="nav-cst"
      >
      <MenuLink/>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import MenuLink from '@/components/helper/menu.vue'
export default {
  components: {
    MenuLink
  },
  data () {
    return {
      nav: false
    }
  },
  methods: {
    signOut () {
      localStorage.removeItem('authToken')
    },
    getuser () {
      return this.$store.getters['getUser']
    },
    getdialogMsg () {
      return this.$store.getters['getdialogMsg']
    }
  },
  mounted () {
  }
}
</script>
<style>
@media only screen and (max-width: 960px){
  .container-cst,.nav-cst{
    margin-top: 48px !important;
  }
}
@media only screen and (max-width: 564px){
  .container-cst,.nav-cst{
    margin-top: 56px !important;
  }
}
.container-cst{
  margin-top: 64px;
}
.primary{
  background-color: #1867c0 !important
}
.nav-cst{
  margin-top: 55px;
}
.nav-top-cst{
  z-index: 999;
}
.default{
  all:unset;
}
</style>
