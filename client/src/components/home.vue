<template>
  <v-app>
    <v-container fluid class="pa-0">
      <v-layout row wrap>
        <v-flex class="nav-top-cst">
          <v-layout>
            <v-flex xs2 class="test">
              <v-icon>restaurant_menu</v-icon>
              <router-link class="default" :to="{name: 'ListResto'}">
              <v-toolbar-title>Rabbito</v-toolbar-title>
              </router-link>
            </v-flex>
            <v-flex xs6 offset-xs1 class="filter">
              <v-text-field class="pa-0"
                hide-details
                v-model="search"
                append-icon="search"
                placeholder="Search..."
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs2 class="cst-flex">
              <v-menu offset-y class="hidden-sm-and-down">
                <div slot="activator" class="pr-2">
                  <h3 class="d-inline-block">{{getuser()==null?"Login":getuser().fullName}}</h3>
                  <v-icon v-if="getuser()">arrow_drop_down</v-icon>
                </div>
                <v-card tile width="300px">
                  <MenuLink/>
                </v-card>
              </v-menu>
            </v-flex>
            <v-flex xs2 class="hidden-md-and-up">
              <v-icon @click="nav = !nav">menu</v-icon>
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
        <!-- <v-navigation-drawer
          temporary
          fixed
          v-model="nav"
          class="nav-cst"
          >
          <MenuLink/>
        </v-navigation-drawer> -->
      </v-layout>
    </v-container>
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
      nav: false,
      navactive: false,
      search: '',
      filter1: 'All',
      filteritem: ['All', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
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
    if (this.$route.name !== 'ListResto') {
      this.navactive = true
    }
  }
}
</script>
<style scoped>
@media only screen and (max-width: 960px){
  .nav-cst{
    margin-top: 120px !important;
  }
}
@media only screen and (max-width: 564px){
  .nav-cst{
    margin-top: 120px !important;
  }
}
.filter,.test{
  /* padding: 0 100px; */
  display: flex;
}
.test{
  justify-content: center;
}
.cst-flex {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
.filter .input-group{
  background: #FFCDD2;
  margin: 0 10px;
}
.filter input{
  padding: 10px;
  color: #6d4c41 !important;
}
.filter .input-group__selections{
  justify-content: center;
}
.filter .input-group__selections__comma{
  color: #6d4c41 !important;
}
.filter .input-group__details:after, .input-group__details:before{
  content: none;
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
  height: 145px;
  border-top: 3px solid #F44336;
  box-shadow:none;
  border-bottom: 1px solid #dedede;
  background-color: #FFFFFF !important;
  /* padding: 0 20px; */
  z-index: 999;
}
.default{
  all:unset;
}
</style>
