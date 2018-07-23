<template>
  <v-container fluid grid-list-lg v-if="getuser()!=null && resto != null">
    <v-layout row wrap>
      <v-flex xs12 lg4 v-for="(item,i) in listMenu" :key="i" >
        <router-link :to="{name: item.link, params: {id: resto.Id}}">
          <v-card class='segment' :class="item.color">
            <div class='segment-item h-150px'>
              <div class='item'>
                <v-icon class='super-large'>{{item.icon}}</v-icon>
                <label class="d-block">{{item.label}}</label>
              </div>
            </div>
          </v-card>
        </router-link>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg6>
            <chartLine v-if="data" :height="350" :data="data" :options="{responsive: true, maintainAspectRatio: false}"/>
          </v-flex>
          <v-flex xs12 sm6 md6 lg6>
            <div class="cardAR-review-cont">
              <div class="cardAR-review-tittle">
                <h2>Comment</h2>
                <div class="cardAR-refresh-cont">
                  <v-btn icon dark @click="refresh"> <v-icon>refresh</v-icon></v-btn>
                </div>
              </div>
              <div class="cardAR-review-item">
                <v-list three-line class="rv-cont">
                  <template v-for="(item, index) in resto.Reviews">
                      <v-list-tile
                        :key="item.title"
                        avatar>
                        <v-list-tile-avatar>
                          <img :src="item.src">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{item.userName}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{item.comment}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <div class="force-center">
                              <span class="rv-item-rate">{{item.rate}}</span>
                              <v-icon color="blue darken-1">star</v-icon>
                              <v-icon class="ma-2 pointer" color="red darken-1" @click="report(item.Id)">error</v-icon>
                          </div>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider
                        :inset="true"
                        :key="index"
                      ></v-divider>
                    </template>
                </v-list>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container v-else>
    loading...
  </v-container>
</template>
<script>
import AdminResto from '@/api/adminresto.js'
import chartLine from '@/components/helper/chart.js'
export default{
  components: {
    chartLine
  },
  data: () => ({
    data: null,
    resto: null,
    listMenu: [
      { link: 'restoSetup', color: 'segment-red', icon: 'info_outline', label: 'Resto Info' },
      { link: 'confirmList', color: 'segment-green', icon: 'assignment', label: 'Confirmation List' },
      { link: 'ReservationList', color: 'segment-purple', icon: 'donut_small', label: 'Reservation List' }
    ]
  }),
  methods: {
    getuser () {
      return this.$store.getters['getUser']
    },
    report (value) {
      AdminResto.updateRestoReview(this, value).then(res => {
        this.refresh()
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Report Success',
          status: true,
          color: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Report Failed',
          status: true,
          color: 'error'
        })
      })
    },
    async getChartData (restoId) {
      var curr = new Date() // get current date
      var first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
      let tmpD = []
      // var firstday = new Date(curr.setDate(first))
      for (let i = 0; i < 7; i++) {
        let tmp = new Date(curr.setDate(first + i))
        let data = {RestoId: restoId, Date: tmp}
        await AdminResto.getCountReservasi(this, data).then(cb => {
          tmpD.push(cb.data[0].count)
        })
      }
      this.data = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Reservation',
            backgroundColor: '#f87979',
            data: tmpD
          }
        ]
      }
    },
    refresh () {
      AdminResto.getTbRestoByIDmin(this, this.getuser().Id).then(res => {
        console.log(res.data)
        this.resto = res.data
        this.resto.Reviews.forEach((val, index) => {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        })
        this.getChartData(res.data.Id)
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
<style scoped>
.cardAR-review-cont{
  height: 350px;
  background: #ffffff;
  border: 1px solid #dedede
}
.cardAR-review-tittle{
  background: #1976d2;
  color: #ffffff;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.cardAR-refresh-cont{
  position: absolute;
  right: 0;
}
.pointer{
  cursor: pointer;
}
.cardAR-review-item{
  height: 312px;
  overflow-y: scroll;
}
</style>
