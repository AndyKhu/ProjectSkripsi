<template>
  <div>
    <v-list subheader>
      <v-subheader>Restaurant</v-subheader>
      <router-link v-for="(item,i) in listMenuR" :key="i" :to="{name: item.link, params: {id: getuser().Id}}" v-if="Type === item.type">
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
      <router-link :to="{path: `/${Type=='AR'?'profileAR':'profile'}/${userId}`}">
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
      },
      {
        link: 'MyFavorite',
        type: 'M',
        icon: 'restaurant',
        label: 'My Favorite'
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
    },
    getuser () {
      return this.$store.getters['getUser']
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
