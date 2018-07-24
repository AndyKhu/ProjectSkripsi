<template>
  <v-container fluid class="cont-reserve">
    <v-layout row wrap justify-center>
      <v-flex xs12 lg10>
        <v-card class="card-content">
          <v-flex xs12 class="item-tittle" :class="active?'py-2 px-3':'pa-1'">
            <v-icon large dark v-if="!active" @click="active = !active">keyboard_arrow_left</v-icon>
            Restaurant Reservation
          </v-flex>
          <v-flex xs12 v-if="active">
            <v-layout row wrap class="py-2">
              <v-flex xs12 md6 lg6 class="px-3">
                <formTextField v-model="data.Name" :label="'Full Name'"/>
              </v-flex>
              <v-flex xs12 md6 lg6 class="px-3">
                <formTextField mask= "#### #### ####" v-model="data.Phone" :label="'Phone Number'"/>
              </v-flex>
              <v-flex xs12 md6 lg6 class="px-3">
                <DateTimePicker v-model="data.reserveDate" cstMinute />
              </v-flex>
              <v-flex xs12 md6 lg6 class="px-3">
                <formComboBox v-model="data.Duration" :Items="duratiItems" :label="'Duration'"/>
              </v-flex>
              <v-flex xs12 md6 lg6 class="px-3">
                <formNumberSmall :max="maxS" v-model="data.totalSeats" :label="'Number of Seat'"/>
              </v-flex>
              <v-flex xs12 class="px-3">
                <formTextField rows="4" multi-line v-model="data.Note" :label="'Note'"/>
              </v-flex>
              <v-flex xs12 class="pt-0 px-3 text-xs-right">
                <v-btn color="primary" @click="nextControl">Next</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-else>
            <v-container fluid grid-list-lg class="list-menu-cont">
              <v-layout row wrap>
                <v-flex xs12 md4 lg4 v-for="(item,i) in resto.FoodMenu" :key="i">
                  <div class="card-food-menu-cont">
                    <v-card-media :src="item.src" class="grey lighten-3" height="170px" contain>
                    </v-card-media>
                    <div class="price-cst-cont">
                      <div class="price-cst">
                        <p class="price-text">{{priceFormated(item.Price)}}</p>
                      </div>
                    </div>
                    <v-layout row wrap class="mx-2 mb-0">
                      <v-flex xs8 class="card-cst-description">
                        {{formatTitle(item.Name)}} <br>
                        <span class="foodmenu-subtittle">{{item.Description}}</span>
                      </v-flex>
                      <v-flex xs4 class="force-center">
                        <formNumberSmall :min="0" :max="99" v-model="item.Amount"/>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-flex xs12 class="py-2 px-3 text-xs-right">
              <v-btn color="primary" @click="Reserve">Reserve</v-btn>
            </v-flex>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Member from '@/api/member.js'
import DateTimePicker from '@/components/helper/formComponent/formDateTimePicker'
import formNumberSmall from '@/components/helper/formComponent/formNumberSmall'
import moment from 'moment'
export default {
  components: {
    DateTimePicker,
    formNumberSmall
  },
  data () {
    return {
      active: true,
      maxS: 0,
      data: {
        Name: null,
        Phone: null,
        reserveDate: this.newDate(),
        Duration: 60,
        totalSeats: 1,
        Note: null,
        Status: 0
      },
      duratiItems: [
        {caption: '1 Jam', value: 60},
        {caption: '1 Jam 30 Menit', value: 90},
        {caption: '2 Jam', value: 120},
        {caption: '2 Jam 30 Menit', value: 150},
        {caption: '3 Jam', value: 180},
        {caption: '3 Jam 30 Menit', value: 210},
        {caption: '4 Jam', value: 240},
        {caption: '4 Jam 30 Menit', value: 270},
        {caption: '5 Jam', value: 300}
      ],
      resto: null
    }
  },
  methods: {
    nextControl () {
      if (this.validate()) {
        this.active = false
      }
    },
    validate () {
      let reserveTime = moment(moment(new Date(this.data.reserveDate)).format('HH:mm'), 'HH:mm').toDate()
      let reserveEnd = moment(reserveTime).add(this.data.Duration, 'minutes').toDate()
      let OpenTime = moment(moment(new Date(this.resto.OpenTime)).format('HH:mm'), 'HH:mm').toDate()
      let CloseTime = moment(moment(new Date(this.resto.CloseTime)).format('HH:mm'), 'HH:mm').toDate()
      if (this.data.Phone === null || this.data.Phone === '') {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Phone Can't be Empty`,
          status: true,
          color: 'error'
        })
        return false
      } else if (OpenTime > reserveTime) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Please Select Another Time ( Resto Not Open Yet )`,
          status: true,
          color: 'error'
        })
        return false
      } else if (CloseTime < reserveTime) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Please Select Another Time ( Resto Closed Already )`,
          status: true,
          color: 'error'
        })
        return false
      } else if (CloseTime < reserveEnd) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Please Select Another Time ( Resto Closed Already )`,
          status: true,
          color: 'error'
        })
        return false
      }
      return true
    },
    newDate () {
      let a = new Date()
      a.setDate(new Date().getDate() + 1)
      a.setMinutes(0)
      return a
    },
    priceFormated (value) {
      let tmp = value
      if (value < 1000) return tmp
      // else return tmp.slice(0, tmp.length - 3)
      else return (tmp / 1000).toFixed(1)
    },
    formatTitle (string) {
      return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1)
    },
    Reserve () {
      this.data.FoodMenu = this.resto.FoodMenu.filter(o => o.Amount)
      this.data.RestoId = this.resto.Id
      this.data.Id_User = this.getuser().Id
      this.data.Cost = this.resto.ReservePrice * (this.data.Duration / 60)
      if (this.data.FoodMenu.length === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Menu Can't be Empty`,
          status: true,
          color: 'error'
        })
      } else {
        Member.saveRestoReserve(this, this.data).then(res => {
          this.$store.dispatch('setDialogMsg', {
            txtmsg: 'Reserve Success',
            status: true,
            color: 'success'
          })
          this.$router.push({name: 'Bill', params: { id: res.data.Id }})
        }).catch(err => {
          console.log(err)
          this.$store.dispatch('setDialogMsg', {
            txtmsg: 'Reserve Failed',
            status: true,
            color: 'error'
          })
        })
      }
    },
    getuser () {
      return this.$store.getters['getUser']
    }
  },
  mounted () {
    Member.getRestoDetailmin(this, this.$route.params.id).then(res => {
      console.log(res.data)
      this.resto = res.data
      this.data.Name = this.getuser().fullName
      this.data.Phone = this.getuser().Phone
      if (this.resto.Seats.length !== 0) {
        this.maxS = this.resto.Seats.map(item => item.seatEnd).reduce((prev, next) => prev > next ? prev : next)
      }
      this.resto.FoodMenu.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        val.src = URL.createObjectURL(x)
        delete val.file
      })
    })
  }
}
</script>
<style scoped>
@media only screen and (min-width: 960px){
  .card-footer{
    position: absolute;
    left: 0;
    bottom: 25px;
    width: 100%;
  }
}
/* .card-food-menu-cont >>> .card__media__background {
  background-size: auto;
} */
.list-menu-cont{
  height: 450px;
  overflow-y: scroll;
  border-bottom: 1px solid #dedede;
}
.cont-reserve{
  background: #eeeeee;
}
.card-content{
  min-height: 550px;
  position: relative;
}
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.item-tittle i{
  cursor: pointer;
}
.card-food-menu-cont{
  border: 1px solid #dedede;
  position: relative;
  height: 269px;
  overflow: hidden;
}
.price-cst-cont{
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
}
.price-cst{
  background: #73c01b;
  width: 25px;
  height: 25px;
  position: relative;
  text-align: center
}
.price-cst:before, .price-cst:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background: #73c01b;
}
.price-cst:before {
    -webkit-transform: rotate(30deg);
       -moz-transform: rotate(30deg);
        -ms-transform: rotate(30deg);
         -o-transform: rotate(30deg);
}
.price-cst:after {
    -webkit-transform: rotate(60deg);
       -moz-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
         -o-transform: rotate(60deg);
}
.price-text {
  z-index: 999;
    font-weight: bold;
    font-size: 13px;
    left: 0;
    right: 0;
    width: 25px;
    height: 25px;
    bottom: 0;
    top: 0;
    margin: auto;
    color: #ffffff;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}
.foodmenu-subtittle {
  font-size: 12px;
  color: #757575;
}
.card-cst-description {
  height: 100px;
}
</style>
