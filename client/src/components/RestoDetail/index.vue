<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="card-content">
          <v-flex xs12 class="Restoname">
            {{value.Name}}
          </v-flex>
          <v-layout class="mh-i plr-8">
            <v-flex class="cst-flex pa-0" :class="cstflex?'cst-flexA':''">
              <v-list class="mh-i pr br">
                <v-list-tile v-for="item in items" :key="item.Id" avatar @click="changeclass(item.Id)" :class="item.active?'activeit':''">
                  <v-list-tile-avatar class="mw-35" :size="30">
                    <v-icon :dark="item.active">{{item.Icon}}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title :class="item.active?'white--text':''">{{item.Tittle}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <div class="cst-btn" @click="test"><v-icon dark>{{cstbtn}}</v-icon></div>
              </v-list>
            </v-flex>
            <v-flex class="grey lighten-5" v-if="getActive()=== 0">
              <v-layout row wrap style="border-bottom: 1px solid #dedede">
                <v-flex xs5>
                  <v-card-media
                    class="white--text"
                    height="250px"
                    :src="formatedImg"/>
                </v-flex>
                <v-flex xs7>
                  <v-layout row wrap>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title pb-0">
                        <v-icon light>local_dining</v-icon>
                        <h4>Dinning Style </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info pt-0">
                        {{value.Type}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title pb-0">
                        <v-icon light>credit_card</v-icon>
                        <h4>Price Range </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info pt-0">
                        {{formattedPF}} s/d {{formattedPE}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title pb-0">
                        <v-icon light>watch_later</v-icon>
                        <h4>Operation Time</h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info pt-0">
                        {{dayformatO}} - {{dayformatC}}
                        <br>
                        {{timeformatO}} - {{timeformatC}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title pb-0">
                        <v-icon light>home</v-icon>
                        <h4>Website </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info pt-0">
                        {{value.Website}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title pb-0">
                        <v-icon light>phone</v-icon>
                        <h4>Phone Number </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info pt-0">
                        {{value.Phone}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title pb-0">
                        <v-icon light>map</v-icon>
                        <h4>Address </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info pt-0">
                        {{value.Address}}
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex lg4 class="cst-divst pa-0">
                  <v-flex xs12 class="title-cst">
                    Facilities
                  </v-flex>
                  <v-layout row wrap>
                  <v-flex lg6 class="col-b"
                  v-for="(item,i) in value.Tb_Resto_Facs" :key="i">
                    <v-flex lg12 class="mini-title jcenter">
                      <v-icon light>{{item.Icon}}</v-icon>
                      <h4>{{item.Name}}</h4>
                    </v-flex>
                  </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex lg8 class="pa-0">
                  <v-flex xs12 class="title-cst">
                    Gallery
                  </v-flex>
                  <v-flex xs12 class="cst-center">
                     <v-carousel style="height:215px; width:500px">
                      <v-carousel-item
                        lazy
                        v-for="(item,i) in formatedTbGallery"
                        :key="i"
                        :src="item.thumb"
                        transition="fade"
                        reverse-transition="fade"
                      ></v-carousel-item>
                    </v-carousel>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="grey lighten-5" v-else-if="getActive()=== 1">
              <v-layout row wrap>
                <v-flex xs6 v-for="(item,i) in formatedTbMenu" :key="i">
                  <v-flex xs12 class="cst-card-menu">
                    <v-layout>
                      <v-flex xs3 class="justify-center-fix">
                        <v-card-media
                          :src="item.thumb"
                          style="width:100%"
                          height="100px"
                          cover
                        ></v-card-media>
                      </v-flex>
                      <v-flex xs7>
                        <v-flex class="pb-0 mini-title">
                          <h4>{{item.Name}}</h4></v-flex>
                        <v-flex class="pt-0 mini-info">{{item.Description}}</v-flex>
                      </v-flex>
                      <v-flex xs2 class="justify-center-fix pa-0">
                        <div class="price-cst">
                          <p class="price-text">{{priceFormated(item.Price)}}</p>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-speed-dial
        v-model="fab"
        bottom
        fixed
        right
        direction="top">
        <v-btn
          slot="activator"
          v-model="fab"
          color="blue darken-2"
          small
          dark
          fab>
          <v-icon class="d-flex">menu</v-icon>
          <v-icon class="d-flex">close</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          @click="backtoList"
          color="red">
          <v-icon class="d-flex">keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo">
          <v-icon class="d-flex">book</v-icon>
        </v-btn>
      </v-speed-dial>
      <!-- <v-btn small fab fixed bottom left color="green" dark><v-icon class="d-flex">keyboard_arrow_left</v-icon></v-btn> -->
    </v-layout>
  </v-container>
</template>
<script>
import moment from 'moment'
import numformat from '@/assets/js/accounting.min.js'
export default {
  props: {
    value: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    cstbtn: 'fast_rewind',
    cstflex: false,
    fab: false,
    Day: [
      { caption: 'Monday', value: 1 },
      { caption: 'Tuesday', value: 2 },
      { caption: 'Wednesday', value: 3 },
      { caption: 'Thursday', value: 4 },
      { caption: 'Friday', value: 5 },
      { caption: 'Saturday', value: 6 },
      { caption: 'Sunday', value: 7 }],
    items: [
      {
        Id: 0,
        Tittle: 'Information',
        Icon: 'info',
        active: true
      },
      {
        Id: 1,
        Tittle: 'Menu',
        Icon: 'book',
        active: false
      }
    ]
  }),
  computed: {
    formattedPF: {
      get () {
        if (this.value.PriceFrom === null) return '-'
        return numformat.formatNumber(parseInt(this.value.PriceFrom), 0, '.', ',')
      }
    },
    formattedPE: {
      get () {
        if (this.value.PriceEnd === null) return '-'
        return numformat.formatNumber(parseInt(this.value.PriceEnd), 0, '.', ',')
      }
    },
    formatedImg: {
      get () {
        let x = new Blob([new Uint8Array(this.value.src.data)])
        let src = URL.createObjectURL(x)
        return src.toString()
      }
    },
    formatedTbGallery: {
      get () {
        let a = []
        for (let n in this.value.Tb_Galleries) {
          let obj = this.value.Tb_Galleries[n]
          let x = new Blob([new Uint8Array(obj.src.data)])
          let src = URL.createObjectURL(x)
          obj.thumb = src.toString()
          a.push(obj)
        }
        return a
      }
    },
    formatedTbMenu: {
      get () {
        let a = []
        for (let n in this.value.Tb_Resto_Menus) {
          let obj = this.value.Tb_Resto_Menus[n]
          let x = new Blob([new Uint8Array(obj.src.data)])
          let src = URL.createObjectURL(x)
          obj.thumb = src.toString()
          a.push(obj)
        }
        return a
      }
    },
    dayformatO: {
      get () {
        if (this.value.OpenDay === null) return '-'
        return this.Day.filter((e) => { return e.value === this.value.OpenDay })[0].caption
      }
    },
    dayformatC: {
      get () {
        if (this.value.CloseDay === null) return '-'
        return this.Day.filter((e) => { return e.value === this.value.CloseDay })[0].caption
      }
    },
    timeformatO: {
      get () {
        if (this.value.OpenTime === null) return '-'
        return moment(this.value.OpenTime || Date.now()).format('HH:mm')
      }
    },
    timeformatC: {
      get () {
        if (this.value.CloseTime === null) return '-'
        return moment(this.value.CloseTime || Date.now()).format('HH:mm')
      }
    }
  },
  methods: {
    test () {
      this.cstflex = !this.cstflex
      if (this.cstflex) this.cstbtn = 'fast_forward'
      else this.cstbtn = 'fast_rewind'
    },
    getActive () {
      return this.items.filter((e) => { return e.active })[0].Id
    },
    backtoList () {
      this.$emit('backtolist')
    },
    changeclass (value) {
      this.items.filter((e) => { return e.active })[0].active = false
      this.items.filter((e) => { return e.Id === value })[0].active = true
    },
    priceFormated (value) {
      let tmp = value.toString()
      if (value < 1000) return tmp
      else return tmp.slice(0, tmp.length - 3)
    }
  }
}
</script>
<style scoped>
.title-cst{
  border-bottom: 1px solid #dedede;
  text-align: center;
  font-size: 18px;
  padding: 0px;
  font-weight: bold;
  color: #424242;
}
.cst-center{
  display: flex;
  align-items: center;
  justify-content: center;
}
.br{
  border-right: 1px solid #d0d0d0;
}
.plr-8{
  padding: 0 8px;
}
.pr{
  position: relative;
}
.mh-i{
  min-height: inherit;
}
.card-content{
  min-height: 540px;
}
.cst-card-menu{
  background: white;
  border: 1px solid #dedede
}
.Restoname{
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  background: #3a3a3a;
}
.cst-flex{
  width: 20%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  min-height: inherit;
  -webkit-transition: width 500ms linear;
  -ms-transition: width 500ms linear;
  transition: width 500ms linear;
}
.cst-flexA{
  width: 4.6% !important;
}
.activeit{
  background:#039be5;
}
.cst-btn{
  position: absolute;
  display: flex;
  top: 15px;
  right: 0;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: #4caf50;
  cursor: pointer;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.cst-btn:hover{
  background: #66bb6a;
}
.col-b{
    color: #424242;
    padding: 20px 10px;
}
.mini-title{
    display: flex;
    align-items: center;
}
.jcenter{
    justify-content: center;
}
.mini-title h4{
    display: inline-block;
    margin-left: 15px;
}
.mini-info{
    font-size: 12px;
    color: #757575;
    margin-left: 40px;
}
.cst-divst{
  border-right: 1px solid #dedede;
  min-height: 275px;
}
.justify-center-fix{
  display: flex;
  align-items: center;
  justify-content: center;
}
.price-cst{
  background: #3f51b5;
  width: 35px;
  height: 35px;
  position: relative;
  text-align: center
}
.price-cst:before, .price-cst:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 35px;
    width: 35px;
    background: #3f51b5;
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
    font-size: 18px;
    left: 0;
    right: 0;
    width: 30px;
    height: 25px;
    bottom: 0;
    top: 0;
    margin: auto;
    color: #ffffff;
    position: absolute;
}
</style>
