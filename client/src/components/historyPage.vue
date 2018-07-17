<template>
  <v-flex xs12 class="pa-2">
    <v-layout row wrap justify-center align-items-center>
      <v-flex xs12 md11 lg11>
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            <v-layout row wrap>
            <v-flex xs8>
              Reservation History
            </v-flex>
            <v-flex xs4 class="force-center-left btn-tittle">
              <v-btn depressed small class="white ma-0 mx-1 x-small-btn" @click="listS = !listS" :class="listS?'factive':''">
                <v-icon small>assignment</v-icon>
              </v-btn>
              <v-btn depressed small class="white ma-0 mx-1 x-small-btn" @click="listS = !listS" :class="!listS?'factive':''">
                <v-icon small>add</v-icon>
              </v-btn>
            </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="pa-2">
            <v-flex xs12 class="cst-card-history pa-2" v-for="(item,i) in items" :key="i">
              <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 class="img-cont">
                  <img :src="item.src" style="width:100%;height:100%;">
                </v-flex>
                <v-flex xs12 sm9 md9 lg9 :class="{'pl-4': $vuetify.breakpoint.smAndUp}">
                  <v-flex xs12 class="py-2 cst-card-history-tittle">
                    <v-layout row wrap>
                      <v-flex xs7 sm8 md8 lg8 class="force-center-left">
                        {{item.RestoName}}
                      </v-flex>
                      <v-flex xs5 sm4 md4 lg4 justify-end class="pr-2 force-center-left">
                        <span class="text-xs-center">
                        {{item.reserveDate | formatDate}}<br>
                        {{item.reserveDate | NormalTime}} - {{item.DurationC | NormalTime}}
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="cst-card-history-item py-2">
                    <v-layout row wrap>
                      <v-flex xs3 sm2 md2 lg2>
                        <b>Progress</b>
                      </v-flex>
                      <v-flex xs9 sm10 md10 lg10 class="cst-card-history-item-label">
                        Unschedule
                      </v-flex>
                      <v-flex xs3 sm2 md2 lg2 class="pt-2">
                        <b>Note</b>
                      </v-flex>
                      <v-flex xs6 sm7 md7 lg7 class="pt-2 cst-card-history-item-label">
                        {{item.Note?item.Note:'-'}}
                      </v-flex>
                      <v-flex xs3 text-xs-right>
                        <v-btn icon class="ma-0" :class="{'btn--small theme--dark primary': $vuetify.breakpoint.xsOnly}">
                          <v-icon :class="{'small-icon': $vuetify.breakpoint.xsOnly, 'primary--text': $vuetify.breakpoint.smAndUp}">cloud_download</v-icon>
                        </v-btn>
                        <v-btn icon class="ma-0" :class="{'btn--small theme--dark error': $vuetify.breakpoint.xsOnly}">
                          <v-icon :class="{'small-icon': $vuetify.breakpoint.xsOnly, 'error--text': $vuetify.breakpoint.smAndUp}">delete</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import Member from '@/api/member.js'
export default {
  data () {
    return {
      listS: true,
      items: []
    }
  },
  mounted () {
    Member.getReservationHistory(this, this.$route.params.id).then(res => {
      this.items = res.data
      this.items.forEach((val, index) => {
        if (val.file) {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        }
      })
    })
  }
}
</script>
<style scoped>
@media only screen and (max-width: 599px){
  .cst-card-history{
    height: 296px !important;
  }
  .cst-card-history-item{
    height: 70px !important;
    padding-bottom: 0px !important
  }
}
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.sub-tittle{
  font-size: 16px;
  font-weight: bold;
  color: #616161;
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
.img-cont{
  height: 150px;
}
.cst-card-history{
  height: 166px;
  margin-bottom: 10px;
  border: 1px solid #dedede;
}
.cst-card-history-tittle{
  height: 60px;
  border-bottom: 1px solid #dedede;
  font-weight: bold;
}
.cst-card-history-item{
  height: 90px;
  display: flex;
  align-items: center;
}
.cst-card-history-item-label::before{
  content: ":";
  margin-right: 10px;
  font-weight: bold;
}
</style>
