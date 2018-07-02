<template>
  <v-container fluid grid-list-lg class="pa-0">
    <v-layout row wrap class="force-center trending-cont" >
      <v-flex xs12 class="force-center">
        <div class="text-xs-center">
        <span class="font-bold font-title">Trending</span>
        <br>
        <span>Popular Restaurant</span>
        </div>
      </v-flex>
      <v-flex lg3 v-for="n in item" style="cursor: pointer"
        :key="n.Id">
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            :src="item.src"
          >
          </v-card-media>
          <v-card-title>
            <div>
              <span><h3>{{n.Name}}</h3></span>
              <span>{{n.Description}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="pl-4 list-resto-cont mb-4" >
      <v-flex xs12 class="pb-0">
        <span class="font-bold font-title"> List Resto </span>
      </v-flex>
      <v-flex lg3 v-for="n in item" style="cursor: pointer"
        :key="n.Id" @click="goDetail(n)">
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            :src="item.src"
          >
          </v-card-media>
          <v-card-title>
            <div>
              <span><h3>{{n.Name}}</h3></span>
              <span>{{n.Description}}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <RDetail v-else v-model="selected" @backtolist="detail = true"/> -->
</template>
<script>
import Member from '@/api/member.js'
export default {
  data: () => ({
    item: null
  }),
  methods: {
    goDetail (value) {
      this.$router.push({name: 'restoDetail', params: { id: value.Id }})
    }
  },
  mounted () {
    Member.loadListResto(this).then(res => {
      this.item = res.data
      this.item.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        this.item.src = URL.createObjectURL(x)
      })
    })
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
</style>
