<template>
  <div v-if="!load">
    <v-card>
      <v-layout row wrap class="px-3 py-2">
        <v-flex xs4>
          <formComboBox v-model="resto" placeholder="Resto" :Items="listResto" @input="test"/>
        </v-flex>
        <v-flex xs4>
          <formComboBox v-model="it" placeholder="Iterasi" :Items="stopList"/>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-btn block @click="executeAlgo" color="primary">Execute</v-btn>
        </v-flex>
        <v-flex xs12 class="px-3" v-if="data!==null && resto !== null">
          <!-- {{selectedItem}} -->
        </v-flex>
      </v-layout>
    </v-card>
  </div>
  <div class='container-loading' v-else>
    <div class='loader'>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--text'></div>
    </div>
  </div>
</template>
<script>
import Algorithm from '@/api/algorithm.js'
export default {
  data: () => ({
    it: 0,
    resto: null,
    listResto: [],
    stopList: [
      {caption: 10, value: 10},
      {caption: 20, value: 20},
      {caption: 30, value: 30},
      {caption: 40, value: 40},
      {caption: 50, value: 50},
      {caption: 60, value: 60},
      {caption: 70, value: 70},
      {caption: 80, value: 80},
      {caption: 90, value: 90},
      {caption: 100, value: 100}
    ],
    data: [],
    load: false,
    selectedItem: null
  }),
  methods: {
    test (value) {
      // this.selectedItem = this.data.data.filter(e => {return e.ID = value})[0]
      // console.log(this.selectedItem)
    },
    executeAlgo () {
      this.load = true
      Algorithm.test(this).then(res => {
        this.load = false
        this.listResto = res.data.ListResto
        this.data = res.data
        console.log(this.data)
      })
    }
  }
}
</script>
