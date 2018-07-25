<template>
  <v-container fluid grid-list-lg class="pa-0" v-if="item !== null">
    <v-layout row wrap class="pa-4 list-resto-cont mb-4" >
      <v-flex xs12 class="pb-0">
        <div class="text-lg-left text-md-left text-xs-center">
          <span class="font-bold font-title">List Resto</span>
        <br>
          <span class="hidden-md-and-up">Restaurant</span>
        </div>
        <!-- <span class="font-bold font-title"> List Resto </span> -->
      </v-flex>
      <v-flex v-if="item && item.length === 0">
        didn't match any Resto
      </v-flex>
      <!-- {{'Name : '+this.$route.params.name +' | Price Max : '+ this.$route.params.max +' | Dinning Style : '+this.$route.params.ds}}</b>" didn't match any Resto</v-flex> -->
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
</template>
<script>
import Member from '@/api/member.js'
export default {
  data () {
    return {
      item: [],
      itemTrending: null,
      page: 1,
      searchtext: this.$route.params.search,
      type: this.$route.params.type,
      price: 9999999999,
      ds: '-',
      totalPage: 1
    }
  },
  methods: {
    reloadData () {
      let sendData
      if (this.type === 0 || this.type === '0') {
        sendData = {
          page: this.page,
          type: 1,
          search: this.searchtext
        }
      } else {
        let tmp = this.searchtext.split('#?')
        let tmps = tmp[0].split('@$')
        sendData = {
          page: this.page,
          type: 2,
          price: parseInt(tmps[0]),
          priceE: parseInt(tmps[1]),
          ds: tmp[1]
        }
      }
      Member.loadListResto(this, sendData).then(res => {
        this.item = res.data.result
        this.totalPage = res.data.pages
        if (this.item) {
          this.item.forEach((val, index) => {
            val.Gallery.forEach((gal, index) => {
              let x = new Blob([new Uint8Array(gal.file.data)])
              val.src = URL.createObjectURL(x)
            })
          })
        }
      })
    },
    goDetail (value) {
      this.$router.push({name: 'restoDetail', params: { id: value.Id }})
    }
  },
  mounted () {
    this.reloadData()
  },
  watch: {
    $route (to, from) {
      if (to.name === 'SearchResto') {
        this.searchtext = to.params.search
        this.type = to.params.type
        this.page = 1
        this.reloadData()
      }
    }
  }
}
</script>
<style scoped>
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
