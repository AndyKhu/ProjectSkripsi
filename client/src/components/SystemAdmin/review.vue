<template>
  <v-card class="card-content">
    <v-flex xs12 class="pa-2 px-3 item-tittle">
      <v-layout row wrap>
        <v-flex xs8 class="force-center-left">
          Reviews Management
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
      <v-flex xs12>
        <v-checkbox
          :label="`Show all`"
          v-model="showAll"
        ></v-checkbox>
      </v-flex>
      <v-data-table v-if="!showAll"
          class="table-cst"
          :headers="headers"
          :search="searchF"
          :items="items">
          <template slot="items" slot-scope="props">
              <td>{{ props.item.Email }}</td>
              <td>{{ props.item.RestoName }}</td>
              <td>{{ props.item.comment }}</td>
              <td class="text-xs-center">SPAM</td>
              <!-- <td>{{ props.item.Reason }}</td> -->
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
      <v-data-table v-else
          class="table-cst"
          :headers="headers2"
          :search="searchF"
          :items="items2">
          <template slot="items" slot-scope="props">
              <td>{{ props.item.Email }}</td>
              <td>{{ props.item.RestoName }}</td>
              <td>{{ props.item.comment }}</td>
              <td class="text-xs-center">SPAM</td>
              <!-- <td>{{ props.item.Reason }}</td> -->
              <td class="text-xs-center">{{ props.item.Status===1?'In Progress':props.item.Status===2?'Approved':'Rejected'}}</td>
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
export default {
  data: () => ({
    items: [],
    items2: [],
    showAll: false,
    searchF: '',
    headers: [
      {text: 'Email', value: 'Email', sortable: false},
      {text: 'Restaurant Name', value: 'RestoName', sortable: false},
      {text: 'Content', value: 'comment', sortable: false},
      {text: 'Reason', value: 'Reason', sortable: false, align: 'center'},
      {text: 'Approve', value: ' ', width: '30px', sortable: false, align: 'center'},
      {text: 'Reject', value: ' ', width: '30px', sortable: false, align: 'center'}],
    headers2: [
      {text: 'Email', value: 'Email', sortable: false},
      {text: 'Restaurant Name', value: 'RestoName', sortable: false},
      {text: 'Content', value: 'comment', sortable: false},
      {text: 'Reason', value: 'Reason', sortable: false, align: 'center'},
      {text: 'Status', value: 'Status', sortable: false, align: 'center'}]
  }),
  methods: {
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
      this.$emit('input', this.items)
    },
    Approve (item) {
      Service.updateRestoReview(this, item.Id, 2).then(res => {
        this.refresh()
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Approve Success',
          status: true,
          color: 'green'
        })
      })
    },
    Reject (item) {
      Service.updateRestoReview(this, item.Id, 3).then(res => {
        this.refresh()
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Reject Success',
          status: true,
          color: 'green'
        })
      })
    },
    refresh () {
      Service.getTbReview(this).then(list => {
        this.items = list.data
      })
      Service.getTbReviewAll(this).then(list => {
        this.items2 = list.data
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
