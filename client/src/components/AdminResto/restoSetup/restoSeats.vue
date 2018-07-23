<template>
  <v-layout row wrap>
    <v-flex xs6 class="pb-0">
      <formPR v-model="minSeat" :PE="maxSeat" @PE="SEC" :label="'Seats For'" @input="input"/>
    </v-flex>
    <v-flex xs6 class="pb-0">
      <formNumberField v-model="noSeat" :label="'Seating Number'"/>
    </v-flex>
    <v-flex xs12 class="pt-0" text-xs-center>
      <v-btn @click="add" small color="primary"> add </v-btn>
      <v-data-table color="primary"
        class="table-cst mt-3"
        :headers="headers"
        :items="Items"
        hide-actions>
          <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.seatFrom }} - {{props.item.seatEnd}}</td>
              <td class="text-xs-left">{{ props.item.noSeat }}</td>
              <td>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
          </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import helper from '@/api/helper'
export default{
  props: {
    value: {
      value: Array,
      required: true,
      default: []
    },
    restoId: {
      value: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      minSeat: 0,
      maxSeat: 0,
      noSeat: 0,
      Items: this.value,
      headers: [
        {text: 'Seats For', value: 'seatFor', sortable: false},
        {text: 'Seating Number', value: 'noSeat', sortable: false},
        {text: 'Actions', value: ' ', width: '30px', sortable: false}]
    }
  },
  methods: {
    add () {
      if (this.minSeat === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Seat from Can`t be 0',
          status: true,
          color: 'error'
        })
      } else if (this.maxSeat === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Seat End Can`t be 0',
          status: true,
          color: 'error'
        })
      } else if (this.maxSeat < this.minSeat) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Seat End Can`t be Smaller than Seat From',
          status: true,
          color: 'error'
        })
      } else if (this.Items.filter((e) => { return e.noSeat === this.noSeat || e.noSeat === this.noSeat.toString() }).length !== 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'No Seat Already Added Please Input another No Seat',
          status: true,
          color: 'error'
        })
      } else {
        this.Items.push({Id: helper.getGuid(), seatFrom: this.minSeat, seatEnd: this.maxSeat, noSeat: this.noSeat, Id_Resto: this.restoId})
        this.minSeat = 0
        this.maxSeat = 0
        this.noSeat = 0
        this.input()
      }
    },
    SEC (value) {
      this.maxSeat = value
    },
    deleteItem (item) {
      const index = this.Items.indexOf(item)
      this.Items.splice(index, 1)
      this.input()
    },
    input () {
      this.$emit('input', this.Items)
    }
  }
}
</script>
