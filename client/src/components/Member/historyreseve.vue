<template>
  <v-layout row wrap justify-center align-items-center>
    <v-flex xs12 md11 lg11>
      <v-card>
        <v-flex xs12 class="item-tittle pa-2">
          <v-layout row wrap>
            <v-flex xs8>
              <v-icon dark large class="pointer" @click="back">keyboard_arrow_left</v-icon>
              Restaurant Reservation
            </v-flex>
            <v-flex xs4 class="force-center-left btn-tittle">
              <v-btn depressed small class="white ma-0 mx-1 x-small-btn" @click="changeListS(true)" :class="active?'factive':''">
                <v-icon small>assignment</v-icon>
              </v-btn>
              <v-btn depressed small class="white ma-0 mx-1 x-small-btn" @click="changeListS(false)" :class="!active?'factive':''">
                <v-icon>shopping_basket</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 v-if="active" class="pa-2">
          <v-layout row wrap class="py-2">
            <v-flex xs12 md6 lg6 class="px-3">
              <formTextField disabled v-model="data.Name" :label="'Full Name'"/>
            </v-flex>
            <v-flex xs12 md6 lg6 class="px-3">
              <formTextField disabled mask= "#### #### ####" v-model="data.Phone" :label="'Phone Number'"/>
            </v-flex>
            <v-flex xs12 md6 lg6 class="px-3">
              <DateTimePicker disabled v-model="data.reserveDate" />
            </v-flex>
            <v-flex xs12 md6 lg6 class="px-3">
              <formComboBox disabled v-model="data.Duration" :Items="duratiItems" :label="'Duration'"/>
            </v-flex>
            <v-flex xs12 md6 lg6 class="px-3">
              <formNumberSmall disabled :max="20" v-model="data.totalSeats" :label="'Number of Seat'"/>
            </v-flex>
            <v-flex xs12 class="px-3">
              <formTextField disabled rows="4" multi-line v-model="data.Note" :label="'Note'"/>
            </v-flex>
            <v-flex xs12 class="text-xs-right px-4">
              <v-btn color="primary" @click="tobill()">Check Bill</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 v-else>
          <v-container fluid grid-list-lg class="list-menu-cont">
            <v-layout row wrap>
              <v-flex xs12 md4 lg4 v-for="(item,i) in data.FoodMenu" :key="i">
                <div class="card-food-menu-cont">
                  <v-card-media :src="item.src" class="grey lighten-3" height="170px" contain>
                  </v-card-media>
                  <div class="price-cst-cont">
                    <div class="price-cst">
                      <p class="price-text">{{priceFormated(item.Menu.Price)}}</p>
                    </div>
                  </div>
                  <v-layout row wrap class="mx-2 mb-0">
                    <v-flex xs8 class="card-cst-description">
                      {{formatTitle(item.Menu.Name)}} <br>
                      <span class="foodmenu-subtittle">{{item.Menu.Description}}</span>
                    </v-flex>
                    <v-flex xs4 class="force-center">
                      <formNumberSmall disabled :min="0" :max="20" v-model="item.Amount"/>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import DateTimePicker from '@/components/helper/formComponent/formDateTimePicker'
import formNumberSmall from '@/components/helper/formComponent/formNumberSmall'
export default {
  components: {
    DateTimePicker,
    formNumberSmall
  },
  props: {
    data: {
      type: Object,
      required: false
    },
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      active: true,
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
      ]
    }
  },
  methods: {
    tobill () {
      this.$router.push({name: 'Bill', params: { id: this.data.Id }})
    },
    back () {
      this.$emit('input', false)
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
    changeListS (value) {
      this.active = value
    }
  }
}
</script>
<style scoped>
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.btn-tittle{
  justify-content: flex-end;
}
.x-small-btn{
  min-width: 30px;
  width: 30px;
}
.small-icon{
  font-size: 18px;
}
.factive{
  background: #4FC3F7 !important;
  color: #ffffff;
}
.x-small-btn >>> .btn__content:before , .x-small-btn >>> .icon {
  transition: none !important;
}
.pointer{
  cursor: pointer;
}
.list-menu-cont{
  height: 450px;
  overflow-y: scroll;
  border-bottom: 1px solid #dedede;
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
