<template>
  <v-card class="card-content">
    <v-flex xs12 class="pa-2 px-3 item-tittle">
      <v-layout row wrap>
        <v-flex xs8 class="force-center-left">
          Admin Resto Request
        </v-flex>
        <v-flex xs4 class="force-center-left card-search">
          <v-text-field class="pa-0"
            hide-details
            append-icon="search"
            v-model="searchF"
            label=" "
            placeholder="search.."/>
          <div class="tooltip-cont">
            <v-btn icon class="mx-0 tp-activator" @click="refresh">
              <v-icon color="blue darken-1">refresh</v-icon>
            </v-btn>
            <div class="tooltip-cst">Refresh</div>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="card-item">
      <v-data-table
          class="table-cst"
          :headers="headers"
          :search="searchF"
          :items="items">
          <template slot="items" slot-scope="props">
              <td>{{ props.item.Email }}</td>
              <td>{{ props.item.fullName }}</td>
              <td>{{ props.item.restoName }}</td>
              <td class="text-xs-center">
                <v-btn icon class="mx-0" @click="show(props.item.Img)">
                  <v-icon color="blue darken-1">assignment</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-center">
                <v-btn icon class="mx-0" @click="Approve(props.item)">
                  <v-icon color="green">check_circle</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-center">
                <v-btn icon class="mx-0" @click="Reject(props.item)">
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
</template>
<script>
import Service from '@/api/systemadmin.js'
export default{
  data: () => ({
    items: [],
    showImg: 'http://via.placeholder.com/90x90',
    searchF: '',
    headers: [
      {text: 'Email', value: 'Email', sortable: false},
      {text: 'Name', value: 'fullName', sortable: false},
      {text: 'Restaurant Name', value: 'restoName', sortable: false},
      {text: 'Business Permit', value: 'Img', sortable: false, align: 'center'},
      {text: 'Approve', value: ' ', width: '30px', sortable: false, align: 'center'},
      {text: 'Reject', value: ' ', width: '30px', sortable: false, align: 'center'}]
  }),
  methods: {
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
      this.$emit('input', this.items)
    },
    Approve (item) {
      // console.log(item)
      Service.ApproveRequestAdmin(this, item).then(res => {
        this.deleteItem(item)
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Approve Success',
          status: true,
          color: 'green'
        })
      })
    },
    Reject (item) {
      Service.RejectRequestAdmin(this, item).then(res => {
        this.deleteItem(item)
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Reject Success',
          status: true,
          color: 'green'
        })
      })
    },
    show (Img) {
      if (Img !== null) {
        let x = new Blob([new Uint8Array(Img.data)])
        this.showImg = URL.createObjectURL(x)
      } else {
        this.showImg = 'http://via.placeholder.com/90x90'
      }
      this.$store.dispatch('setAdminDialog', {
        status: true,
        src: this.showImg
      })
    },
    refresh () {
      Service.getTbRequestAdminInProgres(this).then(list => {
        this.items = list.data
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
