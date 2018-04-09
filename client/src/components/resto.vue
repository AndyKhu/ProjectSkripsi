<template>
  <div>
    <v-toolbar dark color="grey darken-4" fixed>
      <v-toolbar-title class="white--text">
        <v-icon>restaurant_menu</v-icon><span class="tittle-cst">&nbsp Rabbito</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Restaurant</v-btn>
        <v-btn flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid grid-list-lg class="item-container">
      <v-layout row wrap>
        <v-flex lg12>
          <v-text-field 
            prepend-icon="search" 
            placeholder="Search" 
            v-model="searchI" 
            hide-details
            clearable
            color="light-blue darken-4">
          </v-text-field>
        </v-flex>
        <v-flex lg3 v-for="n in 8" class="restoI" @mouseover="classOver" @mouseleave="classOut" :class="{activeit : sta}"
          :key="n">
          <router-link to="D">
            <v-card>
              <v-card-media
                class="white--text"
                height="200px"
                :src="`/static/Resto/0${n}.jpg`"
              >
              </v-card-media>
              <v-card-title>
                <div>
                  <span>Whitehaven Beach</span><br>
                  <span>Whitsunday Island, Whitsunday Islands</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </router-link>
        </v-flex>
        <v-flex lg6>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import '../assets/resto.css'
export default {
  data: () => ({
    menu: false,
    searchI: '',
    sta: false
  }),
  methods: {
    classOver () {
      this.sta = true
    },
    classOut () {
      this.sta = false
    }
  }
}
</script>
