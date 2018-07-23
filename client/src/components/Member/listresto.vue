<template>
  <v-container fluid grid-list-lg class="pa-0" v-if="item !== null">
    <v-layout row wrap class="force-center trending-cont pa-4" >
      <v-flex xs12 class="force-center">
        <div class="text-xs-center">
        <span class="font-bold font-title">Trending</span>
        <br>
        <span>Popular Restaurant</span>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="cst-slider-img">
          <v-btn icon color="white" class="cst-slider-btnR hidden-md-and-up" @click="sliderR"><v-icon>keyboard_arrow_right</v-icon></v-btn>
          <v-btn icon color="white" class="cst-slider-btnL hidden-md-and-up" @click="sliderL"><v-icon>keyboard_arrow_left</v-icon></v-btn>
          <div class="cst-slider-img-item" :class="itemTrending.length === 3?'sl3':itemTrending.length === 2?'sl2':'sl1'">
            <v-layout row wrap justify-center>
              <v-flex xs4 md3 lg3 v-for="n in itemTrending" style="cursor: pointer" :class="itemTrending.length === 3?'xs4':itemTrending.length === 2?'xs6':'xs12'"
                :key="n.Id" @click="goDetail(n)">
                <v-card class="card-cont">
                  <div class="card-img-cont">
                    <img :src="n.src" alt="" v-if="n.src">
                    <img :src="'http://via.placeholder.com/310x200'" alt="" v-else>
                  </div>
                  <v-card-title>
                    <div>
                      <span><h3>{{n.Name}}</h3></span>
                      <span>{{n.Description === null ? '-' : n.Description}}</span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="pa-4 list-resto-cont mb-4" >
      <v-flex xs12 class="pb-0">
        <div class="text-lg-left text-md-left text-xs-center">
          <span class="font-bold font-title">List Resto</span>
        <br>
          <span class="hidden-md-and-up">Restaurant</span>
        </div>
        <!-- <span class="font-bold font-title"> List Resto </span> -->
      </v-flex>
      <v-flex xs12 md3 lg3 v-for="n in item" style="cursor: pointer"
        :key="n.Id" @click="goDetail(n)">
        <v-card class="card-cont">
          <div class="card-img-cont">
            <img :src="n.src" alt="" v-if="n.src">
            <img :src="'http://via.placeholder.com/310x200'" alt="" v-else>
          </div>
          <v-card-title>
            <div>
              <span><h3>{{n.Name}}</h3></span>
              <span>{{n.Description}}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <v-pagination
          v-model="page"
          @input="reloadData"
          :length="totalPage"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container v-else>
  </v-container>
  <!-- <RDetail v-else v-model="selected" @backtolist="detail = true"/> -->
</template>
<script>
import Member from '@/api/member.js'
export default {
  data: () => ({
    item: [],
    itemTrending: [],
    page: 1,
    totalPage: 1
  }),
  methods: {
    reloadData (value) {
      Member.loadListResto(this, this.page, '-', 0, '-').then(res => {
        this.item = res.data.result
        this.totalPage = res.data.pages
        this.item.forEach((val, index) => {
          val.Gallery.forEach((gal, index) => {
            let x = new Blob([new Uint8Array(gal.file.data)])
            val.src = URL.createObjectURL(x)
          })
        })
      })
    },
    goDetail (value) {
      this.$router.push({name: 'restoDetail', params: { id: value.Id }})
    },
    sliderR () {
      if (this.item.length > 1) {
        if (document.getElementsByClassName('cst-slider-img-item')[0].style.left === '5px') document.getElementsByClassName('cst-slider-img-item')[0].style.left = '-100%'
        else if (document.getElementsByClassName('cst-slider-img-item')[0].style.left === '-100%' && this.item.length > 2) document.getElementsByClassName('cst-slider-img-item')[0].style.left = '-201.5%'
        else if (document.getElementsByClassName('cst-slider-img-item')[0].style.left === '-100%' && this.item.length === 2) document.getElementsByClassName('cst-slider-img-item')[0].style.left = '5px'
        else if (document.getElementsByClassName('cst-slider-img-item')[0].style.left === '-201.5%') document.getElementsByClassName('cst-slider-img-item')[0].style.left = '5px'
        else document.getElementsByClassName('cst-slider-img-item')[0].style.left = '-100%'
      }
    },
    sliderL () {
      if (this.item.length > 1) {
        if (document.getElementsByClassName('cst-slider-img-item')[0].style.left === '5px' && this.item.length > 2) document.getElementsByClassName('cst-slider-img-item')[0].style.left = '-201.5%'
        else if (document.getElementsByClassName('cst-slider-img-item')[0].style.left === '-100%') document.getElementsByClassName('cst-slider-img-item')[0].style.left = '5px'
        else if (document.getElementsByClassName('cst-slider-img-item')[0].style.left === '-201.5%') document.getElementsByClassName('cst-slider-img-item')[0].style.left = '-100%'
        else if (this.item.length === 2) document.getElementsByClassName('cst-slider-img-item')[0].style.left = '-100%'
        else document.getElementsByClassName('cst-slider-img-item')[0].style.left = '-201.5%'
      }
    }
  },
  mounted () {
    this.reloadData(this.page)
    Member.loadListRestoTrending(this).then(res => {
      this.itemTrending = res.data.result
      this.itemTrending.forEach((val, index) => {
        val.Gallery.forEach((gal, index) => {
          let x = new Blob([new Uint8Array(gal.file.data)])
          val.src = URL.createObjectURL(x)
        })
      })
    })
  }
}
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .cst-slider-img{
    width: 100%;
    position: relative;
    height: 300px;
    overflow: hidden;
  }
  .cst-slider-btnL{
    position: absolute;
    z-index: 999;
    left: 0;
    top: 40%;
  }
  .cst-slider-btnR{
    position: absolute;
    right: 0;
    z-index: 999;
    top: 40%;
  }
  .sl1{
    width: 100%;
  }
  .sl2{
    width: 200%;
  }
  .sl3{
    width: 300%;
  }
  .cst-slider-img-item{
    position: absolute;
    left: 5px;
     -webkit-transition: left 1s; /* Safari */
    transition: left 1s;
  }
}
.trending-cont{
  background: #F0F0F0;
  padding-bottom: 10px;
}
.font-title{
  font-size: 18px;
}
.list-resto-cont{
  background: #FFFFFF;
  border-top: 1px solid #dedede;
}
.card-cont{
  height: 306px !important;
  border: 1px solid #BDBDBD;
  overflow: hidden;
}
.card-img-cont{
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dedede;
}
.card-img-cont img{
  /* max-width: 100%;
  max-height: 100%; */
  width: 100%;
  height: 100%;
}
</style>
