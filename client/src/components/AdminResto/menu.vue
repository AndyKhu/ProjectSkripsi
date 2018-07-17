<template>
  <v-container fluid grid-list-lg v-if="getuser()!=null && resto != null">
    <v-layout row wrap>
      <v-flex xs12 lg4 v-for="(item,i) in listMenu" :key="i" >
        <router-link :to="{name: item.link}">
          <v-card class='segment' :class="item.color">
            <div class='segment-item h-150px'>
              <div class='item'>
                <v-icon class='super-large'>{{item.icon}}</v-icon>
                <label class="d-block">{{item.label}}</label>
              </div>
            </div>
          </v-card>
        </router-link>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg6>
            <div class="cardAR-review-cont">
              <div class="cardAR-review-tittle">
                <h2>Comment</h2>
                <div class="cardAR-refresh-cont">
                  <v-btn icon dark @click="refresh"> <v-icon>refresh</v-icon></v-btn>
                </div>
              </div>
              <div class="cardAR-review-item">
                <v-list three-line class="rv-cont">
                  <template v-for="(item, index) in resto.Reviews">
                      <v-list-tile
                        :key="item.title"
                        avatar>
                        <v-list-tile-avatar>
                          <img :src="'http://via.placeholder.com/200x200'">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{item.userName}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{item.comment}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <div class="force-center">
                              <span class="rv-item-rate">{{item.rate}}</span>
                              <v-icon color="blue darken-1">star</v-icon>
                              <v-icon class="ma-2 pointer" color="red darken-1" @click="report(item.Id)">error</v-icon>
                          </div>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider
                        :inset="true"
                        :key="index"
                      ></v-divider>
                    </template>
                </v-list>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container v-else>
    loading...
  </v-container>
</template>
<script>
import AdminResto from '@/api/adminresto.js'
export default{
  data: () => ({
    resto: null,
    listMenu: [
      { link: 'restoSetup', color: 'segment-red', icon: 'info_outline', label: 'Resto Info' },
      { link: 'confirmList', color: 'segment-green', icon: 'assignment', label: 'Confirmation List' },
      { link: 'restoSetup', color: 'segment-purple', icon: 'donut_small', label: 'Reservation List' }
    ]
  }),
  methods: {
    getuser () {
      return this.$store.getters['getUser']
    },
    report (value) {
      AdminResto.updateRestoReview(this, value).then(res => {
        this.refresh()
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Report Success',
          status: true,
          color: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Report Failed',
          status: true,
          color: 'error'
        })
      })
    },
    refresh () {
      AdminResto.getTbRestoByIDmin(this, this.getuser().Id).then(res => {
        this.resto = res.data
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
<style scoped>
.cardAR-review-cont{
  height: 350px;
  background: #ffffff;
  border: 1px solid #dedede
}
.cardAR-review-tittle{
  background: #1976d2;
  color: #ffffff;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.cardAR-refresh-cont{
  position: absolute;
  right: 0;
}
.pointer{
  cursor: pointer;
}
.cardAR-review-item{
  height: 312px;
  overflow-y: scroll;
}
</style>
