<template>
  <v-flex xs12 class="pa-2">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 class="item-tittle pa-2">
            {{dialogT ? 'Payment Confirmation' : 'Confirmation'}}
          </v-flex>
          <v-flex xs6 class="pa-2 px-3" v-if="dialogT">
            <formComboBox v-model="formConfirm.BankId" :label="'Bank'" :Items="formConfirm.BankItem"/>
            <formTextField v-model="formConfirm.SenderName" :label="'Sender Name'"/>
            <formUploadImg v-model="formConfirm.Attachment" :label="'Attachment'" :icon="'attachment'"/>
          </v-flex>
          <v-flex xs6 class="pa-2 px-3" v-if="dialogT">
            <DateTimePicker v-model="formConfirm.TransferDt" :label="'Transfer Date'" />
            <formNumberField disabled v-model="formConfirm.Nominal" :label="'Nominal'"/>
          </v-flex>
          <v-flex xs12 class="pa-2 label-sub" v-if="!dialogT">
            Are You Sure want to Cancel This Reservation ?
          </v-flex>
          <v-flex xs12 class="text-xs-right px-3 pt-0 pb-3">
            <v-btn small color="error" @click="closeDialog">
              Cancel
            </v-btn>
            <v-btn small color="primary" @click="clickControl">
              Confirm
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-layout row wrap justify-center align-items-center v-if="!detail">
      <v-flex xs12 md11 lg11>
        <v-card>
          <v-flex xs12 class="item-tittle pa-2">
            <v-layout row wrap>
            <v-flex xs8>
              Reservation History
            </v-flex>
            <v-flex xs4 class="force-center-left btn-tittle">
              <v-btn depressed small class="white ma-0 mx-1 x-small-btn" @click="changeListS(true)" :class="listS?'factive':''">
                <v-icon small>assignment</v-icon>
              </v-btn>
              <v-btn depressed small class="white ma-0 mx-1 x-small-btn" @click="changeListS(false)" :class="!listS?'factive':''">
                <v-icon>check_box</v-icon>
              </v-btn>
            </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="container-history pa-2">
            <v-flex xs12 v-if="items.length === 0" class="text-xs-center">
               No Data
            </v-flex>
            <v-flex xs12 class="cst-card-history pa-2" v-for="(item,i) in itemPage[page-1]" :key="i" v-else>
              <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 class="img-cont pointer" @click="toDetail(item)">
                  <img :src="item.src" style="width:100%;height:100%;">
                </v-flex>
                <v-flex xs12 sm9 md9 lg9 :class="{'pl-4': $vuetify.breakpoint.smAndUp}">
                  <v-flex xs12 class="py-2 cst-card-history-tittle">
                    <v-layout row wrap>
                      <v-flex xs7 sm8 md8 lg8 class="force-center-left">
                        {{item.Resto.Name}}
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
                        {{getStatus(item.Status)}}
                      </v-flex>
                      <v-flex xs3 sm2 md2 lg2 class="pt-2" v-if="item.Status === 4">
                        <b>Reject Note</b>
                      </v-flex>
                      <v-flex xs9 sm10 md10 lg10 class="pt-2 cst-card-history-item-label" v-if="item.Status === 4">
                        {{item.rejectNote?item.rejectNote:'-'}}
                      </v-flex>
                      <v-flex xs3 sm2 md2 lg2 class="pt-2">
                        <b>Note</b>
                      </v-flex>
                      <v-flex xs6 sm7 md7 lg7 class="pt-2 cst-card-history-item-label">
                        {{item.Note?item.Note:'-'}}
                      </v-flex>
                      <v-flex xs3 text-xs-right>
                        <v-btn @click="upload(item)" icon class="ma-0" :class="{'btn--small theme--dark primary': $vuetify.breakpoint.xsOnly}" v-if="item.Status === 0 || item.Status === 1">
                          <v-icon :class="{'small-icon': $vuetify.breakpoint.xsOnly, 'primary--text': $vuetify.breakpoint.smAndUp}">cloud_download</v-icon>
                        </v-btn>
                        <v-btn @click="cancel(item)" icon class="ma-0" :class="{'btn--small theme--dark error': $vuetify.breakpoint.xsOnly}" v-if="item.Status === 0 || item.Status === 1">
                          <v-icon :class="{'small-icon': $vuetify.breakpoint.xsOnly, 'error--text': $vuetify.breakpoint.smAndUp}">delete</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="text-xs-center container-footer pa-3">
              <v-pagination
                v-model="page"
                :length="totalPage"
              ></v-pagination>
            </v-flex>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    <restoReserve readOnly :data="detailData" v-model="detail" v-else/>
  </v-flex>
</template>
<script>
import Member from '@/api/member.js'
import DateTimePicker from '@/components/helper/formComponent/formDateTimePicker'
import restoReserve from '@/components/Member/historyreseve.vue'
export default {
  components: {
    DateTimePicker,
    restoReserve
  },
  data () {
    return {
      dialogT: true,
      listS: true,
      detail: false,
      detailData: {},
      page: 1,
      totalPage: 1,
      limit: 3,
      dialog: false,
      items: [],
      formConfirm: {
        BankItem: [],
        BankId: '',
        TransferDt: new Date(),
        SenderName: '',
        Nominal: 0,
        Attachment: null,
        Id_Reserve: null
      },
      selectedItem: null
    }
  },
  methods: {
    clickControl () {
      if (this.dialogT) {
        this.confirmDialog()
      } else {
        this.executeCancel()
      }
    },
    toDetail (value) {
      this.detail = true
      this.detailData = value
    },
    changeListS (value) {
      this.listS = value
      if (this.listS) {
        Member.getReservationHistory(this, this.$route.params.id).then(res => {
          this.items = res.data
          this.page = 1
          this.totalPage = Math.ceil(this.items.length / this.limit)
          this.items.forEach((val, index) => {
            if (val.file) {
              let x = new Blob([new Uint8Array(val.file.data)])
              val.src = URL.createObjectURL(x)
              delete val.file
            }
            val.FoodMenu.forEach((fm, index) => {
              if (fm.file) {
                let x = new Blob([new Uint8Array(fm.file.data)])
                fm.src = URL.createObjectURL(x)
                delete fm.file
              }
            })
          })
        })
      } else {
        Member.getReservationHistory2(this, this.$route.params.id).then(res => {
          this.items = res.data
          this.page = 1
          this.totalPage = Math.ceil(this.items.length / this.limit)
          this.items.forEach((val, index) => {
            if (val.file) {
              let x = new Blob([new Uint8Array(val.file.data)])
              val.src = URL.createObjectURL(x)
              delete val.file
            }
            val.FoodMenu.forEach((fm, index) => {
              if (fm.file) {
                let x = new Blob([new Uint8Array(fm.file.data)])
                fm.src = URL.createObjectURL(x)
                delete fm.file
              }
            })
          })
        })
      }
    },
    closeDialog () {
      this.dialog = false
      this.formConfirm = {
        Id: null,
        BankItem: [],
        BankId: '',
        TransferDt: new Date(),
        SenderName: '',
        Nominal: 0,
        Attachment: null,
        Id_Reserve: null
      }
    },
    errorMsg (value) {
      this.$store.dispatch('setDialogMsg', {
        txtmsg: value,
        status: true,
        color: 'error'
      })
    },
    checkValid () {
      if (!this.formConfirm.Attachment) {
        this.errorMsg('Receipt Attachment Required')
        return false
      } else if (!this.formConfirm.SenderName || this.formConfirm.SenderName === '') {
        this.errorMsg('Sender Name Required')
        return false
      } else if (!this.formConfirm.BankId || this.formConfirm.BankId === '') {
        this.errorMsg('Bank Required')
        return false
      } else return true
    },
    confirmDialog () {
      if (this.checkValid()) {
        Member.HistoryReservationUpload(this, this.formConfirm).then(res => {
          this.closeDialog()
          this.selectedItem.Upload = res.data
          this.selectedItem.Status = 1
        })
      }
    },
    upload (item) {
      this.dialog = true
      this.dialogT = true
      this.selectedItem = item
      this.formConfirm.Id_Reserve = item.Id
      this.formConfirm.Nominal = item.Cost
      if (item.Upload) {
        this.formConfirm = item.Upload
        this.formConfirm.BankItem = []
      }
      item.Resto.Account.forEach((val, index) => {
        this.formConfirm.BankItem.push({caption: val.BankName + ' - ' + val.AccountNumber, value: val.Id})
      })
    },
    getStatus (val) {
      // 0 request reservation (unpaid)
      // 1 user upload bukti tapi blum di confirm AR (pending)
      // 2 setelah di confirm AR ( paid (unschedule) )
      // 3 Scheduled
      // 4 Rejected
      // 5 Done
      // 6 User Cancel
      return val === 0 ? 'Unpaid' : val === 1 ? 'Pending' : val === 2 ? 'Paid (unschedule)' : val === 3 ? 'Scheduled' : val === 4 ? 'Rejected' : val === 5 ? 'Done' : 'Canceled'
    },
    cancel (val) {
      this.dialog = true
      this.dialogT = false
      this.selectedItem = val
    },
    executeCancel () {
      Member.cancelReservation(this, this.selectedItem.Id).then(cb => {
        this.items.splice(this.items.indexOf(this.selectedItem), 1)
        this.dialog = false
      })
    }
  },
  computed: {
    itemPage () {
      let hasil = []
      for (let i = 0; i < this.totalPage; i++) {
        hasil.push(this.items.slice(i * this.limit, (i + 1) * this.limit))
      }
      return hasil
    }
  },
  mounted () {
    Member.getReservationHistory(this, this.$route.params.id).then(res => {
      this.items = res.data
      this.totalPage = Math.ceil(this.items.length / this.limit)
      this.items.forEach((val, index) => {
        if (val.file) {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        }
        val.FoodMenu.forEach((fm, index) => {
          if (fm.file) {
            let x = new Blob([new Uint8Array(fm.file.data)])
            fm.src = URL.createObjectURL(x)
            delete fm.file
          }
        })
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
  .container-footer{
    position: relative !important;
    padding: 0 !important;
  }
}
.label-sub {
  color: #616161;
  font-size: 14px;
  word-wrap: break-word;
}
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.container-history{
  min-height: 600px;
  position: relative;
}
.container-footer{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
.pointer{
  cursor: pointer;
}
</style>
