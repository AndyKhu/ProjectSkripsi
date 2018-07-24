<template>
  <v-flex xs12 class="pa-2">
    <v-layout row wrap justify-center align-items-center>
      <v-flex xs12 md11 lg11>
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            <v-layout row wrap>
            <v-flex xs12>
              Confirmation List
            </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="pa-2">
            <v-data-table
              class="table-cst"
              :headers="headers"
              :items="items">
              <template slot="items" slot-scope="props">
                  <td>{{ props.item.Name }}</td>
                  <td>{{ props.item.reserveDate | formatDateTime}}</td>
                  <td class="text-xs-center">{{ props.item.totalSeats }}</td>
                  <td class="text-xs-center">{{ props.item.Duration | menitToHours }}</td>
                  <td>Rp. {{ props.item.Cost | formatPrice}}</td>
                  <td class="text-xs-center">
                    <v-btn icon class="mx-0" @click="menuShow(props.item.FoodMenu)">
                      <v-icon color="blue darken-1">restaurant_menu</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-xs-center">
                    <v-btn icon class="mx-0" @click="showPic(props.item)">
                      <v-icon color="blue darken-1">assignment</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-xs-center">
                    <v-btn icon class="mx-0" @click="confirm(props.item, true)">
                      <v-icon color="green">check_circle</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-xs-center">
                    <v-btn icon class="mx-0" @click="reject(props.item)">
                      <v-icon color="pink">cancel</v-icon>
                    </v-btn>
                  </td>
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
      <div class="button-cont front" id="dialogB" v-if="dialogState === 'Img'">
        <!-- <v-btn icon small color="white" @click="close"><v-icon>close</v-icon></v-btn> -->
        <div class="cst-dialog-item force-center">
          <img :src="dialogsrc" alt="">
        </div>
      </div>
      <div class="dialogItem pa-3" id="dialogB" v-else>
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
    <v-dialog v-model="cdialog" persistent max-width="600">
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 class="item-tittle pa-2">
            Reject Confirmation
          </v-flex>
          <!-- <v-flex xs12 class="pa-2 label-sub">
            Are You Sure want to Reject This Reservation ?
          </v-flex> -->
          <v-flex xs12 class="pa-2">
            <formTextField rows="4" multi-line v-model="Note" :label="'Note'"/>
          </v-flex>
          <v-flex xs12 class="text-xs-right px-3 pt-0 pb-3">
            <v-btn small color="error" @click="cdialog = false;Note = ''">
              Cancel
            </v-btn>
            <v-btn small color="primary" @click="rejectC">
              Confirm
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import AdminResto from '@/api/adminresto.js'

export default {
  data: () => ({
    cdialog: false,
    dialog: false,
    dialogState: '',
    Note: '',
    tmp: null,
    menuS: [],
    headersD: [{text: 'Name', value: 'Name', sortable: false}, {text: 'qty', value: 'Amount', width: '50px', sortable: false, align: 'center'}, {text: 'Rate', value: 'Rate', width: '150px', sortable: false, align: 'center'}, {text: 'Amount', value: '-', width: '50px', sortable: false, align: 'center'}],
    items: [],
    headers: [
      {text: 'Name', value: 'Name', sortable: false},
      {text: 'Reservation Date', value: 'ReserveDate', width: '180px', sortable: false},
      {text: 'Seat', value: 'Seat', width: '50px', sortable: false, align: 'center'},
      {text: 'Duration', value: 'Duration', width: '100px', sortable: false, align: 'center'},
      {text: 'Cost', value: 'Cost', sortable: false, width: '150px'},
      {text: 'Menu', value: ' ', width: '30px', sortable: false, align: 'center'},
      {text: 'Receipt', value: ' ', width: '30px', sortable: false, align: 'center'},
      {text: 'Confirm', value: ' ', width: '30px', sortable: false, align: 'center'},
      {text: 'Reject', value: ' ', width: '30px', sortable: false, align: 'center'}]
  }),
  mounted () {
    AdminResto.getTbReservationConfirm(this, this.$route.params.id).then(cb => {
      this.items = cb.data
    })
  },
  methods: {
    rejectC () {
      if (this.Note === null || this.Note === '') {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Note Required`,
          status: true,
          color: 'error'
        })
      } else {
        this.tmp.Note = this.Note
        this.confirm(this.tmp, false)
        this.cdialog = false
        this.Note = ''
      }
    },
    showPic (value) {
      this.dialog = true
      this.dialogState = 'Img'
      this.dialogsrc = value.src
      setTimeout(() => document.addEventListener('click', this.hide), 0)
      setTimeout(() => document.addEventListener('keyup', this.hide), 0)
    },
    confirm (value, status) {
      AdminResto.updateTbReservationConfirm(this, value.Id, status, value.Note ? value.Note : '').then(cb => {
        this.items.splice(this.items.indexOf(value), 1)
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `${status ? 'Confirm' : 'Reject'} Success`,
          status: true,
          color: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Something error Call Admin',
          status: true,
          color: 'error'
        })
      })
    },
    reject (value) {
      this.tmp = value
      this.cdialog = true
    },
    menuShow (value) {
      this.dialog = true
      this.menuS = value
      this.dialogState = ''
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
            this.dialogState = ''
            this.dialogsrc = ''
            document.removeEventListener('click', this.hide)
            document.removeEventListener('keyup', this.hide)
          }
        } else {
          if ((e.target === parent || this.isChildOf(e.target, parent))) {
            // do nothing
          } else {
            this.dialog = false
            this.menuS = []
            this.dialogState = ''
            this.dialogsrc = ''
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
