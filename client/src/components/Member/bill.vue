<template>
  <v-container fluid grid-list-lg v-if="data">
    <v-layout row wrap justify-center class="pa-2">
      <v-flex xs12 sm8 md8 lg8 class="pa-2 mb-2">
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            Customer Detail
          </v-flex>
          <v-layout row wrap justify-end class="pa-2">
            <v-flex xs11 class="Menu-border-bottom pa-2">
              <v-layout row wrap>
                <v-flex xs9 class="label-tittle">
                  Customer Name
                </v-flex>
                <v-flex xs3 class="text-xs-center label-sub">
                  {{data.Name}}
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs11 class="Menu-border-bottom pa-2">
              <v-layout row wrap>
                <v-flex xs9 class="label-tittle">
                  Phone Number
                </v-flex>
                <v-flex xs3 class="text-xs-center label-sub">
                  {{data.Phone}}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8 md8 lg8 class="pa-2 mb-2">
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            Menu Detail
          </v-flex>
          <v-layout row wrap justify-end class="pa-2">
            <v-flex xs11 class="Menu-border-bottom pa-2" v-for="(item,i) in data.FoodMenu" :key="i">
              <v-layout row wrap>
                <v-flex xs9 class="label-tittle">
                  {{item.Menu.Name}}
                </v-flex>
                <v-flex xs3 class="text-xs-center label-sub">
                  {{item.Amount}}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8 md8 lg8 class="pa-2">
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            Payment Details
          </v-flex>
          <v-layout row wrap justify-end class="pa-2">
            <v-flex xs2 sm1 md1 lg1 class="text-xs-center force-center">
              <v-icon>card_giftcard</v-icon>
            </v-flex>
            <v-flex xs10 sm11 md11 lg11 class="pa-2">
              <v-layout row wrap>
                <v-flex xs9 class="pb-0 label-tittle">
                  Reservation Cost ({{data.Resto.Name}})
                </v-flex>
                <v-flex xs3 class="pb-0 text-xs-center label-sub">
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs2 sm1 md1 lg1 class="text-xs-center">
            </v-flex>
            <v-flex xs10 sm11 md11 lg11 class="Menu-border-bottom pa-2">
              <v-layout row wrap>
                <v-flex xs12 class="pt-0">
                  <p class="ma-2 label-sub">Seat : {{data.totalSeats}}<br></p>
                  <p class="ma-2 label-sub"> Duration : {{data.Duration | menitToHours}}<br></p>
                  <p class="ma-2 label-sub">Reservation Price : {{data.Resto.ReservePrice | formatPrice}} / Hour</p>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs2 sm1 md1 lg1 class="text-xs-center">
              <v-icon>shopping_cart</v-icon>
            </v-flex>
            <v-flex xs10 sm11 md11 lg11 class="Menu-border-bottom pa-2">
              <v-layout row wrap>
                <v-flex xs7 sm9 md9 lg9 class="label-tittle">
                  Total Cost
                </v-flex>
                <v-flex xs5 sm3 md3 lg3 class="text-xs-center label-sub">
                  Rp. {{data.Cost | formatPrice}}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container v-else>
    loading.
  </v-container>
</template>
<script>
import Member from '@/api/member.js'
export default {
  data () {
    return {
      data: null
    }
  },
  methods: {
  },
  mounted () {
    Member.getHistoryReserverById(this, this.$route.params.id).then(cb => {
      this.data = cb.data
      console.log(this.data)
    })
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
.label-tittle{
  font-size: 16px;
  font-weight: bold;
  color: #424242;
}
.label-sub {
  color: #616161;
  font-size: 14px;
  word-wrap: break-word;
}
.border-bottom{
  border-bottom: 1px solid #bdbdbd
}
.Menu-border-bottom{
  border-bottom: 1px solid #bdbdbd
}
.Menu-border-bottom:last-child{
  border-bottom: none !important;
}
</style>
