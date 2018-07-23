<template>
  <v-flex xs12 class="pa-2">
    <v-layout row wrap justify-center align-items-center>
      <v-flex xs12 md11 lg11>
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            <v-layout row wrap>
            <v-flex xs8>
              Reservation Schedule
            </v-flex>
            <v-flex xs4 class="text-xs-right">
              <v-btn depressed small class="white ma-0 x-small-btn" @click="changeForm(true)" :class="form?'factive':''">
                <v-icon small>assignment</v-icon>
              </v-btn>
              <v-btn depressed small class="white ma-0 x-small-btn" @click="changeForm(false)" :class="!form?'factive':''">
                <v-icon small>history</v-icon>
              </v-btn>
            </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="pa-2">
            <v-layout row wrap>
              <v-flex xs8 class="py-2 px-1">
                <DateTimePicker :disabled="form" v-model="reserveDate" dateOnly :label="'Reservation Date'" inLine disabledMinDate @input="getTbReservationScheduleByDate"/>
              </v-flex>
              <v-flex xs4 class="text-xs-right py-2 px-3">
                <v-tooltip bottom>
                  <v-btn slot="activator" icon class="ma-0" @click="getTbReservationScheduleByDate(reserveDate)" v-if="form">
                    <v-icon color="primary" > refresh </v-icon>
                  </v-btn>
                  <span>Refresh</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
            <v-data-table
              class="table-cst"
              :headers="form?headers:headers2"
              :items="items">
              <template slot="items" slot-scope="props">
                  <td>{{ props.item.Reservation.Name }}</td>
                  <td class="text-xs-center">{{ props.item.Reservation.reserveDate | NormalTime}}</td>
                  <td class="text-xs-center">{{ props.item.Reservation.totalSeats }}</td>
                  <td class="text-xs-center">{{ props.item.Seats.noSeat }}</td>
                  <td class="text-xs-center">{{ props.item.Reservation.Duration | menitToHours }}</td>
                  <td>Rp. {{ props.item.Reservation.Cost | formatPrice}}</td>
                  <td class="text-xs-center">
                    <v-btn icon class="mx-0" @click="menuShow(props.item.Reservation.FoodMenu)">
                      <v-icon color="blue darken-1">restaurant_menu</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-xs-center" v-if="form">
                    <v-btn icon class="mx-0" @click="done(props.item)">
                      <v-icon color="success">check_circle</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-xs-center" v-if="!form">{{ getStatus(props.item.Status) }}</td>
              </template>
              <template slot="no-data">
                <v-alert :value="true" color="red darken-1" icon="warning">
                  Request Empty
                </v-alert>
              </template>
            </v-data-table>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="dialogBox" v-if="dialog">
      <div class="dialogItem pa-3" id="dialogB">
        <div class="dialogTittle pa-2">
          Items Order
        </div>
        <div class="dialogBody">
          <v-data-table
          class="table-cst"
          :headers="headersD"
          hide-actions
          :items="menuS">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.Menu.Name }}</td>
                <td class="text-xs-center">{{ props.item.Amount }}</td>
                <td class="text-xs-center">{{ props.item.Menu.Price | formatPrice}}</td>
                <td class="text-xs-center">{{ props.item.Menu.Price * props.item.Amount | formatPrice}}</td>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="red darken-1" icon="warning">
                Request Empty
              </v-alert>
            </template>
          </v-data-table>
        </div>
        <div class="dialogFooter pa-2 text-xs-right">
          Total : {{getTotal() | formatPrice}}
        </div>
      </div>
    </div>
  </v-flex>
</template>
<script>
import AdminResto from '@/api/adminresto.js'
import DateTimePicker from '@/components/helper/formComponent/formDateTimePicker'

export default {
  components: {
    DateTimePicker
  },
  data: () => ({
    reserveDate: new Date(),
    dialog: false,
    form: true,
    menuS: [],
    headersD: [{text: 'Name', value: 'Name', sortable: false}, {text: 'qty', value: 'Amount', width: '50px', sortable: false, align: 'center'}, {text: 'Rate', value: 'Rate', width: '150px', sortable: false, align: 'center'}, {text: 'Amount', value: '-', width: '50px', sortable: false, align: 'center'}],
    items: [],
    headers: [
      {text: 'Name', value: 'Name', sortable: false},
      {text: 'Reservation Time', value: 'ReserveDate', width: '180px', sortable: false, align: 'center'},
      {text: 'Seat For', value: 'SeatF', width: '50px', sortable: false, align: 'center'},
      {text: 'No. Seat', value: 'Seat', width: '50px', sortable: false, align: 'center'},
      {text: 'Duration', value: 'Duration', width: '100px', sortable: false, align: 'center'},
      {text: 'Cost', value: 'Cost', sortable: false, width: '150px'},
      {text: 'Menu', value: ' ', width: '30px', sortable: false, align: 'center'},
      {text: 'Done', value: ' ', width: '30px', sortable: false, align: 'center'}],
    headers2: [
      {text: 'Name', value: 'Name', sortable: false},
      {text: 'Reservation Time', value: 'ReserveDate', width: '180px', sortable: false, align: 'center'},
      {text: 'Seat For', value: 'SeatF', width: '50px', sortable: false, align: 'center'},
      {text: 'No. Seat', value: 'Seat', width: '50px', sortable: false, align: 'center'},
      {text: 'Duration', value: 'Duration', width: '100px', sortable: false, align: 'center'},
      {text: 'Cost', value: 'Cost', sortable: false, width: '150px'},
      {text: 'Menu', value: ' ', width: '30px', sortable: false, align: 'center'},
      {text: 'Status', value: 'Status', width: '100px', sortable: false, align: 'center'}]
  }),
  mounted () {
    // AdminResto.getTbReservationSchedule(this, data).then(cb => {
    //   console.log(cb)
    //   this.items = cb.data
    // })
    this.getTbReservationScheduleByDate(new Date())
  },
  methods: {
    changeForm (value) {
      this.form = value
      if (this.form) {
        this.reserveDate = new Date()
      }
      this.getTbReservationScheduleByDate(this.reserveDate)
    },
    done (value) {
      AdminResto.updateTbReservationSchedule(this, value).then(cb => {
        this.items.splice(this.items.indexOf(value), 1)
      })
    },
    getTbReservationScheduleByDate (value) {
      if (this.form) {
        AdminResto.getTbReservationSchedule(this, new Date(value)).then(cb => {
          this.items = cb.data
        })
      } else {
        AdminResto.getTbReservationSchedule2(this, new Date(value)).then(cb => {
          console.log(cb)
          this.items = cb.data
        })
      }
    },
    getStatus (value) {
      return value === 1 ? 'Complete' : 'Rejected'
    },
    menuShow (value) {
      this.dialog = true
      this.menuS = value
      setTimeout(() => document.addEventListener('click', this.hide), 0)
      setTimeout(() => document.addEventListener('keyup', this.hide), 0)
    },
    getTotal () {
      return this.menuS.map(item => item.Amount * item.Menu.Price).reduce((prev, next) => prev + next)
    },
    isChildOf (child, parent) {
      if (child.parentNode === parent) {
        return true
      } else if (child.parentNode === null) {
        return false
      } else {
        return this.isChildOf(child.parentNode, parent)
      }
    },
    hide (e) {
      let parent = document.getElementById('dialogB')
      if (e) {
        if (e.keyCode) {
          if (e.keyCode === 27) {
            this.dialog = false
            this.menuS = []
            document.removeEventListener('click', this.hide)
            document.removeEventListener('keyup', this.hide)
          }
        } else {
          if ((e.target === parent || this.isChildOf(e.target, parent))) {
            // do nothing
          } else {
            this.dialog = false
            this.menuS = []
            document.removeEventListener('click', this.hide)
            document.removeEventListener('keyup', this.hide)
          }
        }
      }
    }

  }
}
</script>
<style scoped>
.x-small-btn{
  min-width: 30px;
  width: 30px;
}
.factive{
  background: #4FC3F7 !important;
  color: #ffffff;
}
.table-cst{
  border:1px solid #dedede;
}
.table-cst th:first-child{
  border-right: none;
}
.table-cst th.column{
  font-weight: bold;
  border-bottom: 1px solid #dedede;
}
.table-cst .datatable__progress th.column{
  border-bottom: none;
}
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.dialogBox{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.63);
}
.dialogList{
  border-bottom: 1px solid #dedede;
}
.dialogItem{
  min-width: 50%;
  background: #ffffff;
  border: 1px solid #dededede
}
.dialogFooter{
  background: #FAFAFA;
  border: 1px solid #dedede;
  border-top: none;
}
.dialogBody{
  /* min-height: 358px; */
  height: 300px;
  border: 1px solid #dedede;
  overflow-y: scroll;
}
.dialogTittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.cst-dialog-item img{
  max-width: 780px;
  max-height: 580px;
}
.button-cont{
  position: relative;
}
.button-cont button{
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
