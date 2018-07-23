<template>
  <v-layout row wrap>
        <v-flex md7 lg7 xsl2 class="my-3 px-3" style="border-right:1px solid #dedede">
          <v-layout row wrap class="mb-4">
            <v-flex xs1>
              <v-icon large>access_time</v-icon>
            </v-flex>
            <v-flex xs11 class="px-3">
              <h2 class="d-inline-block">Operation Time</h2>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs11 align-center class="px-3">
              <span class="rd-subtitle">
                {{resto.OpenDay | getDay}} - {{resto.CloseDay | getDay}} <br/>
                {{resto.OpenTime | NormalTime}} - {{resto.CloseTime | NormalTime}}
              </span>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-4">
            <v-flex xs1>
              <v-icon large>credit_card</v-icon>
            </v-flex>
            <v-flex xs11 class="px-3">
              <h2 class="d-inline-block">Price Range</h2>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs11 align-center class="px-3">
              <span class="rd-subtitle">
                {{resto.PriceFrom | formatPrice}} s/d {{resto.PriceEnd | formatPrice}}
              </span>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-4">
            <v-flex xs1>
              <v-icon large>location_on</v-icon>
            </v-flex>
            <v-flex xs11 class="px-3">
              <h2 class="d-inline-block">Address</h2>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs11 align-center class="px-3">
              <span class="rd-subtitle">
                {{resto.Address}}
              </span>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-4">
            <v-flex xs1>
              <v-icon large>phone</v-icon>
            </v-flex>
            <v-flex xs11 class="px-3">
              <h2 class="d-inline-block">Phone Number</h2>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs11 align-center class="px-3">
              <span class="rd-subtitle">
                {{resto.Phone}}
              </span>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-4">
            <v-flex xs1>
              <v-icon large>home</v-icon>
            </v-flex>
            <v-flex xs11 class="px-3">
              <h2 class="d-inline-block">Website</h2>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs11 align-center class="px-3">
              <span class="rd-subtitle">
                {{resto.Website}}
              </span>
            </v-flex>
        </v-layout>
    </v-flex>
    <v-flex md5 lg5 xsl2 class="my-3 px-2">
      <v-flex xs12 class="line-bottom pb-3" text-xs-center>
        <h2 class="mb-2">Payment List</h2>
        <v-flex xs12 text-xs-center v-if="resto.Account.length == 0">
          -
        </v-flex>
        <v-flex xs12 class="rd-item-center px-2" v-for="(item,i) in resto.Account" :key="i">
          <v-icon large>credit_card</v-icon>
          <span class="rd-item-title mx-2">
            {{item.BankName}} : {{item.AccountNumber}}
          </span>
        </v-flex>
      </v-flex>
      <v-flex xs12 class="pb-3" text-xs-center>
        <h2 class="mb-2">Facility</h2>
        <v-flex xs12 text-xs-center v-if="resto.Facility.length == 0">
          -
        </v-flex>
        <v-flex xs12 class="rd-item-center px-2 my-3" v-for="(item,i) in resto.Facility" :key="i">
          <v-icon large>{{item.Icon}}</v-icon>
          <span class="rd-item-title ml-3">
            {{item.Name}}
          </span>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
export default{
  props: {
    resto: {
      value: Object,
      required: true,
      default: {}
    }
  }
}
</script>
<style scoped>
.rd-item-center{
  display: flex;
  align-items: center;
}
.rd-item-title{
  font-size: 18px;
  color: #424242;
}
.line-bottom{
  border-bottom: 1px solid #dedede;
}
</style>
