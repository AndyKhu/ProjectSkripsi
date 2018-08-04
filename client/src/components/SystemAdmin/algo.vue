<template>
  <div v-if="!load">
    <v-card>
      <v-flex xs12 class="py-2 px-3">
        <v-btn block @click="executeAlgo" color="primary">Execute</v-btn>
      </v-flex>
      <v-layout row wrap class="px-3 item">
        <v-flex xs12 class="force-center sub-tittle pa-1">
          Filter
        </v-flex>
        <v-flex xs4>
          <formComboBox v-model="filter.coRate" placeholder="Cross Over Rate" noLabel :Items="coRateItems"/>
        </v-flex>
        <v-flex xs4>
          <formComboBox v-model="filter.muRate" placeholder="Mutasi Rate" noLabel :Items="coRateItems"/>
        </v-flex>
        <v-flex xs4>
          <formComboBox v-model="filter.resto" placeholder="List Resto" noLabel :Items="listResto" itemText="Name" itemValue="Id"/>
        </v-flex>
        <v-container fluid grid-list-md class="mb-3">
        <v-layout row wrap class="cst-table-algo">
          <v-flex xs3 class="force-center border-bottom border-right success white--text white--border">
            Iterasi
          </v-flex>
          <v-flex xs9 class="border-bottom">
            <v-layout row wrap class="table-cst-xs">
              <v-flex xs12 class="border-bottom success white--text white--border">
                Percobaan
              </v-flex>
              <v-flex xs1 v-for="i in 10" :key="i" class="border-right success white--text white--border">
                {{i}}
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap v-for="(item,index) in TableRow" :key="index" class="border-bottom">
              <v-flex xs3 class="border-right success white--text white--border">
                {{item.iterasi}}
              </v-flex>
              <v-flex xs9>
                <v-layout row wrap class="table-cst-xs">
                  <v-flex xs1 v-for="(fitnes,findex) in item.data" :key="findex" class="border-right grey lighten-5">
                    {{fitnes.fitness}}
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        </v-container>
      </v-layout>
      <v-flex xs12 class="py-2 px-3" v-if="bestResult">
        Best Iterasi : <br>
        &emsp; Nilai Fitness : {{bestResult.data[0].fitness}}
        &emsp; Percobaan : {{bestResult.percobaan}}
        &emsp; Iterasi : {{bestResult.it}}
      </v-flex>
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
import Service from '@/api/systemadmin.js'
import Algorithm from '@/api/algorithm.js'
export default {
  data: () => ({
    it: 0,
    listResto: [],
    data: [],
    load: false,
    bestResult: null,
    coRateItems: [
      {caption: 0.9, value: 0.9},
      {caption: 0.8, value: 0.8},
      {caption: 0.7, value: 0.7},
      {caption: 0.6, value: 0.6},
      {caption: 0.5, value: 0.5},
      {caption: 0.4, value: 0.4},
      {caption: 0.3, value: 0.3},
      {caption: 0.2, value: 0.2},
      {caption: 0.1, value: 0.1}
    ],
    TableRow: [
      {iterasi: 100, data: []},
      {iterasi: 150, data: []},
      {iterasi: 200, data: []},
      {iterasi: 250, data: []},
      {iterasi: 300, data: []}
    ],
    filter: {
      coRate: null,
      muRate: null,
      resto: null
    }
  }),
  mounted () {
    Service.getListRestoObject(this).then(cb => {
      this.listResto = cb.data
    })
  },
  methods: {
    test (value) {
      // this.selectedItem = this.data.data.filter(e => {return e.ID = value})[0]
    },
    executeAlgo () {
      this.load = true
      Algorithm.test(this, this.filter).then(res => {
        if (res.data.length !== 0) {
          this.data = res.data[0].Data
          this.bestResult = this.data.filter(e => { return e.code === 'x0x' })[0]
          console.log(this.data.filter(e => { return e.code === 'x0x' })[0])
          console.log(this.data.filter(e => { return e.code === 'x1x' })[0])
          this.TableRow = [
            {
              iterasi: 100,
              data: this.data.filter(e => { return e.iterasi === 20 })
            },
            {
              iterasi: 150,
              data: this.data.filter(e => { return e.iterasi === 40 })
            },
            {
              iterasi: 200,
              data: this.data.filter(e => { return e.iterasi === 60 })
            },
            {
              iterasi: 250,
              data: this.data.filter(e => { return e.iterasi === 80 })
            },
            {
              iterasi: 300,
              data: this.data.filter(e => { return e.iterasi === 100 })
            }
          ]
        }
        this.load = false
        // this.listResto = res.data.ListResto
        // this.data = res.data
      })
    }
  }
}
</script>
<style scoped>
.white--border{
  border-color: #FFFFFF !important;
}
.border-right{
  border-right: 1px solid #dedede !important;
}
.border-right:last-child{
  border-right: none !important;
}
.item {
  border-top: 1px solid #dedede
}
.sub-tittle{
  font-size: 16px;
  color: #424242;
}
.table-cst-xs .xs1{
  flex-basis: 10% !important;
  max-width: 10% !important;
}
.cst-table-algo{
  border: 1px solid #dedede;
}
.border-bottom{
  border-bottom: 1px solid #dedede;
}
.border-bottom:last-child{
  border-bottom: none;
}
</style>
