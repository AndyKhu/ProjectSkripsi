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
                <DateTimePicker v-model="data.reserveDate" />
              </v-flex>
              <v-flex xs12 md6 lg6 class="px-3">
                <formComboBox v-model="data.Duration" :Items="duratiItems" :label="'Duration'"/>
              </v-flex>
              <v-flex xs12 md6 lg6 class="px-3">
                <formNumberSmall :max="20" v-model="data.totalSeats" :label="'Number of Seat'"/>
              </v-flex>
              <v-flex xs12 class="px-3">
                <formTextField rows="4" multi-line v-model="data.Note" :label="'Note'"/>
              </v-flex>
              <v-flex xs12 class="pt-0 px-3 text-xs-right">
                <v-btn color="primary" @click="active = !active">Next</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-else>
            <v-container fluid grid-list-lg class="list-menu-cont">
              <v-layout row wrap>
                <v-flex xs12 md4 lg4 v-for="(item,i) in resto.FoodMenu" :key="i">
                  <div class="card-food-menu-cont">
                    <v-card-media :src="item.src" height="170px" contain>
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
                        <formNumberSmall :min="0" :max="20" v-model="item.Amount"/>
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
export default {
  components: {
    DateTimePicker,
    formNumberSmall
  },
  data () {
    return {
      active: true,
      data: {
        Name: null,
        Phone: null,
        reserveDate: new Date().setDate(new Date().getDate() + 1),
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
    priceFormated (value) {
      let tmp = value.toString()
      if (value < 1000) return tmp
      else return tmp.slice(0, tmp.length - 3)
    },
    formatTitle (string) {
      return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1)
    },
    Reserve () {
      this.data.FoodMenu = this.resto.FoodMenu.filter(o => o.Amount)
      this.data.RestoId = this.resto.Id
      this.data.Id_User = this.getuser().Id
      Member.saveRestoReserve(this, this.data).then(res => {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Reserve Success',
          status: true,
          color: 'success'
        })
        this.$router.push({name: 'memberHistory', params: { id: this.getuser().Id }})
      }).catch(err => {
        console.log(err)
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Reserve Failed',
          status: true,
          color: 'error'
        })
      })
    },
    getuser () {
      return this.$store.getters['getUser']
    }
  },
  mounted () {
    Member.getRestoDetailmin(this, this.$route.params.id).then(res => {
      this.resto = res.data
      this.data.Name = this.getuser().fullName
      this.data.Phone = this.getuser().Phone
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
  max-height: 450px;
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
