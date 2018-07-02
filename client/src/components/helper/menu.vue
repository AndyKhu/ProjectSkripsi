<template>
  <div>
    <v-list subheader>
      <v-subheader>Restaurant</v-subheader>
      <router-link v-for="(item,i) in listMenuR" :key="i" :to="{name: item.link}" v-if="Type === item.type">
        <v-list-tile avatar @click="donothing">
          <v-list-tile-avatar>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.label}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
    </v-list>
    <v-divider/>
    <v-list subheader>
      <v-subheader>Account</v-subheader>
      <router-link :to="{path: `/profile/${userId}`}">
        <v-list-tile avatar @click="donothing">
          <v-list-tile-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>My Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
      <v-list-tile avatar @click="signOut">
        <v-list-tile-avatar>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Log Out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    Type: {
      type: String,
      required: false,
      default: 'M'
    },
    userId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => ({
    listMenuR: [
      {
        link: 'memberHistory',
        type: 'M',
        icon: 'history',
        label: 'Reservation History'
      },
      {
        link: 'AdminResto',
        type: 'AR',
        icon: 'restaurant',
        label: 'My Resto'
      }
    ]
  }),
  methods: {
    donothing () {
    },
    signOut () {
      this.$store.dispatch('setUser', null)
      localStorage.removeItem('authToken')
      this.$router.push('/')
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
