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
            <!-- Iterasi -->
            Cross Over Rate
          </v-flex>
          <v-flex xs9 class="border-bottom">
            <v-layout row wrap class="table-cst-xs">
              <!-- <v-flex xs12 class="border-bottom success white--text white--border">
                Percobaan
              </v-flex>
              <v-flex xs1 v-for="i in 10" :key="i" class="border-right success white--text white--border">
                {{i}}
              </v-flex> -->
              <v-flex xs12 class="border-bottom success white--text white--border">
                <!-- Percobaan -->
                Mutasi Rate
              </v-flex>
              <v-flex xs1 v-for="i in 9" :key="i" class="border-right success white--text white--border">
                0.{{i}}
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
                    {{fitnes.fitness}} - {{fitnes.x+1}}
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
      <v-flex xs12 class="py-2 px-3" v-if="bentrok">
        Reservasi Bentrok : <br>
        <div v-for="(val,i) in bentrok" :key="i" >
          <v-layout row wrap class="mb-4">
            <v-flex xs6>
              &emsp; <b>Reservasi ID a :</b> {{val.reserveId}}<br>
              &emsp; <b>Seat ID a : </b>{{val.seatId}}<br>
              &emsp; <b>Seat No a : </b>{{val.noSeat}}<br>
              &emsp; <b>TotalSeat a : </b>{{val.totalSeats}}<br>
              &emsp; <b>Time Start a : </b>{{new Date(val.timeS) | NormalTime}}<br>
              &emsp; <b>Time End a : </b>{{new Date(val.timeE) | NormalTime}}<br>
              &emsp; <b>CreatedAt a : </b>{{new Date(val.createdAt) | NormalTime}}<br>
            </v-flex>
            <v-flex xs6>
              &emsp; <b>Reservasi ID b : </b>{{val.bentrok}}<br>
              &emsp; <b>Seat ID b : </b>{{val.seatIdb}}<br>
              &emsp; <b>Seat No b : </b>{{val.bnoSeat}}<br>
              &emsp; <b>TotalSeat b : </b>{{val.btotalSeats}}<br>
              &emsp; <b>Time Start b : </b>{{new Date(val.btimeS) | NormalTime}}<br>
              &emsp; <b>Time End b : </b>{{new Date(val.btimeE) | NormalTime}}<br>
              &emsp; <b>CreatedAt b : </b>{{new Date(val.bcreatedAt) | NormalTime}}<br>
            </v-flex>
          </v-layout>
        </div>
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
    bentrok: null,
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
      // {iterasi: 20, data: []},
      // {iterasi: 40, data: []},
      // {iterasi: 60, data: []},
      // {iterasi: 80, data: []},
      // {iterasi: 100, data: []}
      {iterasi: 0.1, data: []},
      {iterasi: 0.2, data: []},
      {iterasi: 0.3, data: []},
      {iterasi: 0.4, data: []},
      {iterasi: 0.5, data: []},
      {iterasi: 0.6, data: []},
      {iterasi: 0.7, data: []},
      {iterasi: 0.8, data: []},
      {iterasi: 0.9, data: []}
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
    ReservasiBentrok2(x){
      let xtmp = []
      x.forEach((a, pindex) => {
        x.forEach((b, nindex) => {
          if(a.reserveId != b.reserveId){
            if(this.dateCheckComplete(b.timeS,b.timeE,a.timeS,a.timeE)){
              if(a.seatId == b.seatId){
                if(xtmp.filter(e => {return e.reserveId === b.reserveId && e.bentrok === a.reserveId}).length === 0)
                  xtmp.push({reserveId: a.reserveId,totalSeats:a.totalSeats,btotalSeats: b.totalSeats,noSeat: a.noSeat,bnoSeat: b.noSeat, seatId: a.seatId, seatIdb: b.seatId, timeS: a.timeS, timeE: a.timeE, btimeS: b.timeS, btimeE: b.timeE, bentrok: b.reserveId, createdAt: a.createdAt,bcreatedAt: b.createdAt})
                // xtmp.push({reserveId: b.reserveId, seatId: b.seatId, timeS: b.timeS, timeE: b.timeE, bentrok: a.reserveId})
              }
            }
          }
        })
      })
      let unique_array = _.uniqWith(xtmp,_.isEqual) 
      // unique_array.forEach((a,ai) =>) 
      return unique_array
    },
    dateCheckComplete(from, to, check, check2) {
      var fromD, toD, checkD, check2D;
      fromD = Date.parse(from);
      toD = Date.parse(to);
      checkD = Date.parse(check);
      check2D = Date.parse(check2);
      if (
        (checkD > fromD && checkD < toD) ||
        (check2D > fromD && check2D < toD) ||
        (fromD === checkD && toD === check2D) ||
        (fromD > checkD && fromD < check2D) ||
        (toD > checkD && toD < checkD)) {
        return true;
      }
      return false;
    },
    executeAlgo () {
      this.load = true
      Algorithm.test(this, this.filter).then(res => {
        if (res.data.length !== 0) {
          this.data = res.data[0].Data
          this.bestResult = this.data.filter(e => { return e.code === 'x0x' })[0]
          this.TableRow = [
            {
              iterasi: 0.1,
              data: this.data.filter(e => { return e.iterasi === 0.1 })
            },
            {
              iterasi: 0.2,
              data: this.data.filter(e => { return e.iterasi === 0.2 })
            },
            {
              iterasi: 0.3,
              data: this.data.filter(e => { return e.iterasi === 0.3 })
            },
            {
              iterasi: 0.4,
              data: this.data.filter(e => { return e.iterasi === 0.4 })
            },
            {
              iterasi: 0.5,
              data: this.data.filter(e => { return e.iterasi === 0.5 })
            },
            {
              iterasi: 0.6,
              data: this.data.filter(e => { return e.iterasi === 0.6 })
            },
            {
              iterasi: 0.7,
              data: this.data.filter(e => { return e.iterasi === 0.7 })
            },
            {
              iterasi: 0.8,
              data: this.data.filter(e => { return e.iterasi === 0.8 })
            },
            {
              iterasi: 0.9,
              data: this.data.filter(e => { return e.iterasi === 0.9 })
            }
          ]
          this.bentrok =this.ReservasiBentrok2(this.data.filter(e => { return e.fitness < 1 && e.iterasi === 0.9 && e.percobaan === 0.9})[0].reservasi.kromosom)
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
  /* flex-basis: 10% !important; */
  /* max-width: 10% !important; */
  flex-basis:11.113% !important;
  max-width:11.113% !important;
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
