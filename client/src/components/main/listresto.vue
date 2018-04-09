<template>
  <v-container fluid grid-list-lg class="item-container">
      <v-layout row wrap>
        <v-flex lg12>
          <v-text-field class="searchfilter"
            prepend-icon="search" 
            placeholder="Search" 
            v-model="searchI" 
            hide-details
            clearable
            light
             :append-icon="'fa-filter'"
             :append-icon-cb="() => (e1 = !e1)"
            color="light-blue darken-4">
          </v-text-field>
        </v-flex>
        <v-flex lg12 v-if="e1" class="filter-cont" >
          <v-card>
            <v-card-title>
            <v-layout row wrap>
              <v-flex xs12 lg5>
                Price Range
                <v-slider prepend-icon="monetization_on" v-model="filter.price"></v-slider>
                Dinning Style
                <v-select
                  v-model="filter.style"
                  required
                  :items="stylelist"
                ></v-select>
              </v-flex>
              <v-flex xs0 lg2>
              </v-flex>
              <v-flex xs12 lg5>
                Table
                <v-select
                  v-model="filter.style"
                  required
                  :items="stylelist"
                ></v-select>
                Hours Operation
                <v-layout>
                  <v-flex lg5>
                  <v-text-field
                    name="input-1"
                    id="testing"
                  ></v-text-field>
                  </v-flex>
                  <v-flex lg2 class="autom" text-xs-center>
                    -
                  </v-flex>
                  <v-flex lg5>
                  <v-text-field
                    name="input-1"
                    id="testing"
                  ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex lg3 v-for="n in data" class="restoI" @mouseover="classOver" @mouseleave="classOut" :class="{activeit : sta}"
          :key="n.restoid">
          <router-link :to="'restodetail?id='+n.restoid" @click="test">
            <v-card>
              <v-card-media
                class="white--text"
                height="200px"
                :src="n.file"
              >
              </v-card-media>
              <v-card-title>
                <div>
                  <span><h3>{{n.restoname}}</h3></span>
                  <span>{{n.restodesc}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
import '../../assets/resto.css'
import auth from '../../router/auth'
import gv from '../../globalvariable'
export default {
  data: () => ({
    searchI: '',
    sta: false,
    e1: false,
    data: [],
    filter: {
      price: 0,
      style: ''
    },
    stylelist: ['1', '2', '3']
  }),
  methods: {
    classOver () {
      this.sta = true
    },
    classOut () {
      this.sta = false
    },
    test () {
    }
  },
  mounted () {
    gv.getlistresto(this, auth.user.userid, '/')
  }
}
</script>