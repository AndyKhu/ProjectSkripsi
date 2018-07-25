<template>
  <v-layout row wrap v-if="getuser()!=null && resto != null">
      <v-flex xs2>
        <restoTab v-model="items" @changeclass="changeclass"/>
      </v-flex>
      <v-flex xs10 class="child">
        <v-container fluid grid-list-lg>
          <v-layout row wrap class="pt-2">
            <v-flex xs12 lg10 offset-lg1>
              <v-card class="card-content">
                <v-flex xs12 class="py-2 px-3 item-tittle">
                  <!-- {{inactive.Tittle}}  -->
                   <v-layout row wrap>
                    <v-flex xs8 class="force-center-left">
                      {{inactive.Tittle}}
                    </v-flex>
                    <v-flex xs4 class="force-center-left btn-tittle">
                      <div class="tooltip-cont" v-if="inactive.Id != 5 && inactive.Id != 4">
                        <v-btn icon color="white darken-1" class="ma-0 tp-activator" @click="save">
                          <v-icon color="success">save</v-icon>
                        </v-btn>
                        <div class="tooltip-cst">Save</div>
                      </div>
                      <div v-else-if="inactive.Id === 4">
                        <v-btn depressed small class="white ma-0 x-small-btn" @click="form = !form" :class="form?'factive':''">
                          <v-icon small>apps</v-icon>
                        </v-btn>
                        <v-btn depressed small class="white ma-0 x-small-btn" @click="form = !form" :class="!form?'factive':''">
                          <v-icon small>add</v-icon>
                        </v-btn>
                      </div>
                    </v-flex>
                   </v-layout>
                </v-flex>
                <v-flex xs12 class="py-3 px-4">
                  <restoInfo v-model="resto" v-if="inactive.Id == 0"/>
                  <restoFac v-model="resto.Facility" :restoId="resto.Id" v-else-if="inactive.Id == 1"/>
                  <restoSeats v-model="resto.Seats" :restoId="resto.Id" v-else-if="inactive.Id == 2"/>
                  <restoAccount v-model="resto.Account" :restoId="resto.Id" v-else-if="inactive.Id == 3"/>
                  <restoFoodMenu v-model="resto.FoodMenu" @formC="formC" :form="form" :restoId="resto.Id" v-else-if="inactive.Id == 4"/>
                  <restoGallery v-model="resto.Gallery" :restoId="resto.Id" v-else-if="inactive.Id == 5"/>
                </v-flex>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
  </v-layout>
  <div class='container-loading' v-else>
    <div class='loader'>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--text'></div>
    </div>
  </div>
</template>
<script>
import AdminResto from '@/api/adminresto.js'
import restoTab from '@/components/AdminResto/restoSetup/SetupMenu.vue'
import restoInfo from '@/components/AdminResto/restoSetup/restoInfo.vue'
import restoFac from '@/components/AdminResto/restoSetup/restoFac.vue'
import restoSeats from '@/components/AdminResto/restoSetup/restoSeats.vue'
import restoGallery from '@/components/AdminResto/restoSetup/restoGallery.vue'
import restoAccount from '@/components/AdminResto/restoSetup/restoAccount.vue'
import restoFoodMenu from '@/components/AdminResto/restoSetup/restoFoodMenu.vue'
// import moment from 'moment'
export default {
  components: {
    restoTab,
    restoInfo,
    restoFac,
    restoGallery,
    restoSeats,
    restoAccount,
    restoFoodMenu
  },
  data: () => ({
    resto: null,
    form: true,
    inactive: { Id: 0, Icon: 'info', Tittle: 'Restaurant Details', active: true },
    items: [
      { Id: 0, Icon: 'info', Tittle: 'Restaurant Details', active: true },
      { Id: 1, Icon: 'stars', Tittle: 'Restaurant Facilities', active: false },
      { Id: 2, Icon: 'extension', Tittle: 'Restaurant Seats', active: false },
      { Id: 3, Icon: 'credit_card', Tittle: 'Account Number', active: false },
      { Id: 4, Icon: 'book', Tittle: 'Restaurant Menu', active: false },
      { Id: 5, Icon: 'image', Tittle: 'Restaurant Gallery', active: false }
    ]
  }),
  methods: {
    formC (value) {
      this.form = value
    },
    changeclass (item) {
      this.items.filter((e) => { return e.active })[0].active = false
      this.items.filter((e) => { return e.Id === item.Id })[0].active = true
      this.inactive = item
    },
    getuser () {
      return this.$store.getters['getUser']
    },
    validate () {
      if (this.resto.Phone === null || this.resto.Phone === '') {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Phone can't Be Empty`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.resto.PriceFrom === null || this.resto.PriceFrom === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Price From can't Be 0`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.resto.PriceEnd === null || this.resto.PriceEnd === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Price End can't Be 0`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.resto.PriceEnd < this.resto.PriceFrom) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Price From can't Be Smaller Than Price End`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.resto.CloseDay < this.resto.OpenDay) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Day Open can't Be Smaller Than Day Close`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.resto.ReservePrice === null || this.resto.reservePrice === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Reserve Price can't be 0`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.resto.Seats.length === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Resto Seats can't be Empty`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.resto.Account.length === 0) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Resto Account can't be Empty`,
          status: true,
          color: 'error'
        })
        return false
      }
      return true
    },
    save () {
      if (this.validate()) {
        AdminResto.updateTbResto(this, this.resto).then(cb => {
          this.$store.dispatch('setDialogMsg', {
            txtmsg: 'Save Success',
            status: true,
            color: 'success'
          })
        }).catch(err => {
          console.log(err)
          this.$store.dispatch('setDialogMsg', {
            txtmsg: 'Save Failed ( Server Error )',
            status: true,
            color: 'success'
          })
        })
      }
    }
  },
  mounted () {
    AdminResto.getTbRestoByID(this, this.getuser().Id).then(res => {
      this.resto = res.data
      this.resto.Gallery.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        let showImg = URL.createObjectURL(x)
        val.src = showImg
        delete val.file
      })
      this.resto.FoodMenu.forEach((val, index) => {
        if (val.file) {
          let x = new Blob([new Uint8Array(val.file.data)])
          let showImg = URL.createObjectURL(x)
          val.src = showImg
        }
      })
    })
  }
}
</script>
<style scoped>
.btn-tittle{
  justify-content: flex-end;
}
.x-small-btn{
  min-width: 30px;
  width: 30px;
}
.factive{
  background: #4FC3F7 !important;
  color: #ffffff;
}
.tooltip-cont{
  position: relative;
}
.tooltip-cont >>> .btn__content {
  font-weight: bold;
}
.tp-activator:hover + .tooltip-cst{
  opacity: 1;
}
.tooltip-cst{
  padding: 5px;
  background: rgb(53, 52, 52);
  color: #ffffff;
  font-size: 12px;
  position: absolute;
  bottom: -30px;
  left: 0px;
  opacity: 0;
}
/* Child CSS */
.child{
  background: #e6f2fa;
}
.child >>> .card-content{
  min-height: 550px;
}
.child >>> .item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.child >>> .table-cst{
  border:1px solid #dedede;
}
.child >>> .table-cst th:first-child{
  border-right: none;
}
.child >>> .table-cst th.column{
  font-weight: bold;
  border-bottom: 1px solid #dedede;
}
.child >>> .table-cst .datatable__progress th.column{
  border-bottom: none;
}
</style>
