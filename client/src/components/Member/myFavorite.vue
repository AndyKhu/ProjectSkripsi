<template>
  <v-flex xs12 class="pa-2">
    <v-layout row wrap justify-center align-items-center>
      <v-flex xs12 md11 lg11>
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            <v-layout row wrap>
            <v-flex xs12>
              My Favorite
            </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="pa-2">
            <v-container fluid grid-list-lg class="pa-0" v-if="item !== null">
            <v-layout row wrap class="pa-4 list-resto-cont mb-4" >
              <v-flex xs12 md3 lg3 v-for="n in showArray" style="cursor: pointer"
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
                  <div class="card-cst-footer">
                    <v-btn icon class="ma-0" @click="deleteFav(n)">
                      <v-icon color="error">delete</v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-flex>
              <v-flex xs12 class="text-xs-center">
                <v-pagination
                  v-model="page"
                  :length="totalPage"
                ></v-pagination>
              </v-flex>
            </v-layout>
            </v-container>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
// import Vuex from 'vuex'
import Member from '@/api/member.js'

export default {
  data () {
    return {
      item: [],
      page: 1,
      totalPage: 1,
      limitPerpage: 8,
      user: null
    }
  },
  mounted () {
    if (this.getUser !== null) {
      this.user = this.getUser
      this.getFavoriteC(this.getUser)
    }
  },
  methods: {
    getFavoriteC (user) {
      Member.getUserFavorite(this, user).then(cb => {
        this.item = cb.data
        this.totalPage = Math.ceil(this.item.length / this.limitPerpage)
        this.item.forEach((val, index) => {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        })
      })
    },
    deleteFav (n) {
      let data = {userId: this.user.Id, restoId: n.Id_Resto, status: false}
      Member.updateFavorite(this, data).then(res => {
        this.page = 1
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Delete Favorite Success',
          status: true,
          color: 'success'
        })
        this.item.splice(this.item.indexOf(n), 1)
        this.totalPage = Math.ceil(this.item.length / this.limitPerpage)
      })
    }
  },
  computed: {
    getUser () {
      return this.$store.getters.getUser
    },
    showArray: {
      get () {
        return this.item.slice((this.page - 1) * this.limitPerpage, (this.page) * this.limitPerpage)
      }
    }
  },
  watch: {
    getUser (newValue, oldValue) {
      if (newValue !== null) {
        this.user = newValue
        this.getFavoriteC(newValue)
      }
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
.list-resto-cont{
  background: #FFFFFF;
  border-top: 1px solid #dedede;
}
.card-cont{
  height: 342px !important;
  border: 1px solid #BDBDBD;
  overflow: hidden;
  box-shadow: none;
}
.card-img-cont{
  width: 100%;
  height: 200px;
  position: relative;
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
.card-cst-footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  border-top: 1px solid #E0E0E0;
  background: #F5F5F5;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
