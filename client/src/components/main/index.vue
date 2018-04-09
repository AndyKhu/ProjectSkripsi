<template>
  <div>
    <v-toolbar dark color="grey darken-4" fixed>
      <v-toolbar-title class="white--text">
        <router-link to="/main"><v-icon>restaurant_menu</v-icon><span class="tittle-cst">&nbsp Rabbito</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up">
        <v-menu
          offset-y
          :close-on-content-click="false"
          :nudge-width="200"
          v-model="menu2"
        >
            <v-btn icon slot="activator" dark>
              <v-icon>fa-caret-down</v-icon>
            </v-btn>
          <v-card>
            <div>
              <router-link to="/main/profile"><v-btn flat>My Profile</v-btn></router-link>
            </div>
            <div>
            <router-link to="/main/history"> <v-btn flat>Reservation History</v-btn></router-link>
            </div>
            <div>
            <router-link to="/main/favorite"> <v-btn flat>My Favorite</v-btn></router-link>
            </div>
            <div>
            <router-link to="/main/myresto" v-if="role == 'admin'"> <v-btn flat>My Resto</v-btn></router-link>
              <v-btn flat v-else>Request Admin</v-btn>            
            </div>
            <div>
              <v-btn flat @click="signOut">Log Out</v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
      <div class="username">{{username}}</div>
      <v-menu
        offset-y
        :close-on-content-click="false"
        :nudge-width="200"
        v-model="menu"
      >
          <v-btn icon slot="activator" dark>
            <v-icon>fa-caret-down</v-icon>
          </v-btn>
        <v-card>
          <div>
            <router-link to="/main/profile"><v-btn flat>My Profile</v-btn></router-link>
          </div>
          <div>
           <router-link to="/main/history"> <v-btn flat>Reservation History</v-btn></router-link>
          </div>
          <div>
          <router-link to="/main/favorite"> <v-btn flat>My Favorite</v-btn></router-link>
          </div>
          <div>
          <router-link to="/main/myresto" v-if="role == 'admin'"> <v-btn flat>My Resto</v-btn></router-link>
            <v-btn flat v-else>Request Admin</v-btn>            
          </div>
          <div>
            <v-btn flat @click="signOut">Log Out</v-btn>
          </div>
        </v-card>
      </v-menu>
        
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </div>
</template>
<script>
import '../../assets/resto.css'
import auth from '../../router/auth'
export default {
  data: () => ({
    menu: false,
    menu2: false,
    username: '',
    role: ''
  }),
  methods: {
    signOut () {
      auth.logout(this)
    }
  },
  mounted () {
    this.role = auth.user.role
    this.username = auth.user.username
  }
}
</script>
