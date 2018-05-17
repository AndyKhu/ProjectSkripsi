<template>
  <div>
    <v-list subheader>
      <v-subheader>Restaurant</v-subheader>
      <router-link to="/">
        <v-list-tile avatar @click="donothing">
          <v-list-tile-avatar>
            <v-icon>history</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Reservation History</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
      <router-link :to="{name: 'MyResto'}">
        <v-list-tile avatar @click="donothing">
          <v-list-tile-avatar>
            <v-icon>restaurant</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>My Resto</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
    </v-list>
    <v-divider/>
    <v-list subheader>
      <v-subheader>Account</v-subheader>
      <router-link to="/main/profile">
        <v-list-tile avatar @click="donothing">
          <v-list-tile-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>My Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
      <router-link to="/">
        <v-list-tile avatar @click="signOut">
          <v-list-tile-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
    </v-list>
  </div>
</template>
<script>
export default {
  methods: {
    donothing () {
    },
    signOut () {
      localStorage.removeItem('authToken')
    }
  }
}
</script>
<style scoped>
a{
  color: #212121;
}
.btn{
  margin: 0 !important;
  height: 50px;
}
</style>
