<template>
  <v-container fluid v-if="resto !== null">
    <v-layout row wrap justify-center>
      <v-flex lg7 xl6>
        <v-card-media
          class="white--text mb-1"
          height="300px"
          :src="defsrc"
        />
        <h2>{{resto.Name}}</h2>
        <v-flex xs12>
          <v-layout row wrap align-center>
            <v-flex xs8>
              <v-icon class="mx-1" color="red darken-1">star</v-icon>
              <span class="rd-subtitle mr-2">
                {{resto.Rate === null?'--':resto.Rate}} | 0 reviews
              </span>
              <v-icon>favorite_border</v-icon>
            </v-flex>
            <v-flex xs4 text-xs-right class="pr-2 pb-2">
              <v-btn depressed color="success" @click="reserve">RESERVE</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-tabs class="cst-tabs"
          v-model="tabs"
          slider-color="red">
          <v-tab v-for="item in tabData" :key="item.key">
            <b>{{item.header}}</b>
          </v-tab>
          <v-tab-item key="inf" class="pa-2">
            <restoInfo :resto="resto" />
          </v-tab-item>
          <v-tab-item key="gal" class="pa-2">
            <restoGallery :resto="resto" />
          </v-tab-item>
        </v-tabs>
      </v-flex>
      <v-flex lg3 offset-lg1 xl2 offset-xl1 class="rd-menu-cont px-4 py-2">
        <v-flex xs12 class="rd-menu-title">
          <h2>Menu</h2>
        </v-flex>
        <v-flex xs12 v-for="(item,i) in resto.FoodMenu" :key="i" class="my-3">
          <div class="card-food-menu-cont">
            <v-card-media :src="item.src" height="170px" cover>
            </v-card-media>
            <div class="price-cst-cont">
              <div class="price-cst">
                <p class="price-text">{{priceFormated(item.Price)}}</p>
              </div>
            </div>
            <v-layout row wrap class="mx-2 mb-0">
            <v-flex xs10>
              {{formatTitle(item.Name)}} <br>
              <span class="foodmenu-subtittle">{{item.Description}}</span>
            </v-flex>
            <!-- <v-flex xs2 class="pa-0 card-food-action">
              <v-btn icon class="ma-0" @click="delMenu(item,i)">
                <v-icon color="error">delete</v-icon>
              </v-btn>
            </v-flex> -->
            </v-layout>
          </div>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
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
import Member from '@/api/member.js'
import restoInfo from '@/components/Member/restoInfo.vue'
import restoGallery from '@/components/Member/restoGallery.vue'
export default {
  components: {
    restoInfo,
    restoGallery
  },
  data () {
    return {
      restoId: this.$route.params.id,
      resto: null,
      tabs: '0',
      defsrc: 'http://via.placeholder.com/950x300',
      tabData: [
        {header: 'Information', key: 'inf'},
        {header: 'Gallery', key: 'gal'},
        {header: 'Reviews', key: 'rev'}
      ]
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
    reserve () {
      if (this.$store.getters['getUser'] === null) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'need login to reserve',
          status: true,
          color: 'error'
        })
      } else {
        this.$router.push({name: 'Reserve', params: {id: this.restoId}})
      }
    }
  },
  mounted () {
    Member.getRestoDetail(this, this.restoId).then(res => {
      this.resto = res.data
      this.resto.Gallery.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        val.src = URL.createObjectURL(x)
        if (val.Type === 'both' || val.Type === 'detail') {
          this.defsrc = URL.createObjectURL(x)
        }
        delete val.file
      })
      this.resto.FoodMenu.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        val.src = URL.createObjectURL(x)
        delete val.file
      })
    }).catch(err => {
      console.log(err)
      this.$router.push({name: 'notFound'})
    })
  }
}
</script>
<style scoped>
.rd-subtitle{
  font-size: 16px;
  color: #616161;
}
/* .rd-subtitle-detail{
  font-size: 14px;
  color: #9E9E9E;
} */
.rd-menu-title{
  border-bottom: 1px solid #dedede;
}
.rd-menu-cont{
  border: 1px solid #dedede;
}
.cst-tabs{
  margin-top: 15px;
  border: 1px solid #dedede;
}
.cst-tabs >>> .tabs__bar{
  border-bottom: 1px solid #dedede;
}
.card-food-menu-cont{
  border: 1px solid #dedede;
  position: relative;
}
.foodmenu-tittle{
  background: #f5f5f5;
  font-size: 16px;
  font-weight: bold;
  color: #757575  ;
  border-bottom: 1px solid #dedede;
}
.card-food-action{
  display: flex;
  justify-content: center;
  align-items: center;
}
.foodmenu-subtittle{
  font-size: 12px;
  color: #757575;
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
</style>
