<template>
  <v-flex xs12 class="pt-2">
    <span class="pa-2">Review of Rabbito</span>
    <v-layout row wrap class="px-2">
      <v-flex xs8 class="pa-2">
        <v-flex xs12 v-for="(item,i) in rvChart" :key="i">
          <v-layout row wrap class="mb-1">
            <v-flex xs1 class="force-center">
              <span class="rv-text">{{i+1}}</span>
              <v-icon color="grey" small class="mx-2">star</v-icon>
            </v-flex>
            <v-flex xs11 class="force-center-left px-1">
              <div class="rv-percent" :style="{width: `${item === 0?'2':item/max * 100}%`}"></div>
              <span class="mx-2">{{item}}</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
      <v-flex xs4 class="force-center flex-column">
        <div class="force-center">
          <h1>{{resto.Rate?resto.Rate.toFixed(1):0}}</h1>
          <v-icon medium>star</v-icon>
        </div>
        <div class="force-center">
          {{resto.Reviews.length}} Reviews
        </div>
      </v-flex>
    </v-layout>
    <v-flex xs12>
      <v-list three-line class="rv-cont">
        <template v-for="(item, index) in resto.Reviews">
            <v-list-tile
              :key="item.title"
              avatar>
              <v-list-tile-avatar>
                <v-avatar :size="40" class="grey darken-1" v-if="!item.src"/>
                <img :src="item.src" v-else>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.userName}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.comment}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <div class="force-center">
                    <span class="rv-item-rate">{{item.rate}}</span>
                    <v-icon color="red darken-1">star</v-icon>
                </div>
              </v-list-tile-action>
            </v-list-tile>
             <v-divider
              :inset="true"
              :key="index"
            ></v-divider>
          </template>
      </v-list>
    </v-flex>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 sm8 md8 lg8>
          <formTextField placeholder="Type Coment Here......" class="rv-input" noPadding v-model="data.comment"/>
        </v-flex>
        <v-flex xs6 sm2 md2 lg2>
          <star-rating :show-rating="false" :star-size="starsize" active-color="#e54436" v-model="data.rate"/>
        </v-flex>
        <v-flex xs6 sm2 md2 lg2>
          <v-btn @click="sendReview" style="height:100%" block depressed class="ma-0" color="primary">send</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-flex>
</template>
<script>
import Member from '@/api/member.js'
export default {
  props: {
    resto: {
      value: Object,
      required: true,
      default: {}
    }
  },
  data () {
    return {
      // clientWidth: 0,
      // clientHeight: 0,
      data: {
        comment: null,
        rate: null,
        Id_Resto: this.resto.Id
      },
      rvChart: [],
      max: 0,
      starsize: 20
    }
  },
  methods: {
    // _updateDimensions () {
    //   // Cross-browser support as described in:
    //   // https://stackoverflow.com/questions/1248081
    //   this.clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    //   this.clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    //   if (this.clientWidth < 600) {
    //     this.starsize = 10
    //   } else {
    //     this.starsize = 20
    //   }
    // },
    getuser () {
      return this.$store.getters['getUser']
    },
    updateRv () {
      this.rvChart = []
      for (let i = 1; i <= 5; i++) {
        this.rvChart.push(this.resto.Reviews.filter(o => o.rate === i).length)
      }
      this.max = Math.max.apply(Math, this.rvChart)
    },
    sendReview () {
      if (this.getuser() !== null && this.data.comment !== null && this.data.rate !== null && this.getuser().Reservation.filter(e => { return e.restoId === this.resto.Id }).length !== 0) {
        this.data.userId = this.getuser().Id
        this.data.userName = this.getuser().fullName
        this.data.PID = this.getuser().DpId
        this.data.Status = 0
        Member.saveRestoReview(this, this.data).then(res => {
          let tmp = this.resto.Reviews.filter((e) => { return e.userId === this.data.userId && e.Id_Resto === this.data.Id_Resto && e.Status !== 2 })
          if (tmp.length === 0) {
            if (res.data.file) {
              let x = new Blob([new Uint8Array(res.data.file.data)])
              res.data.src = URL.createObjectURL(x)
              delete res.data.file
            }
            this.resto.Reviews.push(res.data)
          } else {
            this.resto.Reviews.filter((e) => { return e.userId === this.data.userId && e.Id_Resto === this.data.Id_Resto && e.Status !== 2 })[0].comment = this.data.comment
            this.resto.Reviews.filter((e) => { return e.userId === this.data.userId && e.Id_Resto === this.data.Id_Resto && e.Status !== 2 })[0].rate = this.data.rate
          }
          this.resto.Rate = this.resto.Reviews.map(item => item.rate).reduce((prev, next) => prev + next) / this.resto.Reviews.length
          Member.updateTbRestoRate(this, this.resto.Id, this.resto.Rate)
          this.$emit('input', this.resto)
          this.$store.dispatch('setDialogMsg', {
            txtmsg: 'Comment Success',
            status: true,
            color: 'success'
          })
          this.data = {
            comment: null,
            rate: null,
            Id_Resto: this.resto.Id
          }
          this.updateRv()
        }).catch(err => {
          console.log(err)
          this.$store.dispatch('setDialogMsg', {
            txtmsg: 'Comment Failed',
            status: true,
            color: 'error'
          })
        })
      } else {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: this.data.comment ? this.data.rate ? this.getuser().Reservation.filter(e => { return e.restoId === this.resto.Id }).length !== 0 ? 'Login First' : 'you must be reserve at least 1x to review' : `Rate Can't be empty` : `Comment Can't be empty`,
          status: true,
          color: 'error'
        })
      }
    }
  },
  mounted () {
    this.updateRv()
    // this.$nextTick(() => {
    //   this._updateDimensions()
    //   window.addEventListener('resize', this._updateDimensions, {'passive': true})
    // })
  }
  // destroyed () {
  //   window.removeEventListener('resize', this._updateDimensions)
  // }
}
</script>
<style scoped>
.rv-text{
  font-size: 18px;
  color: #424242;
  font-weight: bold;
}
.rv-percent{
  background: #e54436;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 2%;
  height: 15px;
}
.vue-star-rating{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 1px solid #dedede;
  border-bottom: none;
  border-right: none;
}
.rv-input >>> input{
  height: 100%;
}
.rv-cont {
  height: 350px;
  overflow-y: scroll;
  border-top: 1px solid #dedede;
}
.rv-item-rate {
  line-height: 35px;
  font-size: 16px;
  color: #616161;
}
</style>
