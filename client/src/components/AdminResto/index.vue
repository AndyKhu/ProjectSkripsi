<template>
  <v-app v-if="getuser()!=null">
    <v-toolbar color="primary" dark class="white--text">
        <router-link :to="{name: 'AdminResto'}">
          <v-toolbar-title class="white--text force-center-left">
            <v-icon class="mr-2">restaurant_menu</v-icon>
            <span>Rabbito</span>
          </v-toolbar-title>
        </router-link>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <div slot="activator" class="pr-2">
          <h3 class="d-inline-block">{{getuser()===null?"":getuser().fullName}}</h3>
          <v-icon>arrow_drop_down</v-icon>
        </div>
        <v-card tile width="300px">
          <MenuLink :Type="'AR'" :userId="getuser().Id"/>
        </v-card>
      </v-menu>
    </v-toolbar>
    <router-view/>
  </v-app>
  <v-app v-else>
    loading..
  </v-app>
</template>
<script>
import MenuLink from '@/components/helper/menu.vue'
export default {
  components: {
    MenuLink
  },
  methods: {
    getuser () {
      return this.$store.getters['getUser']
    }
  }
}
</script>
