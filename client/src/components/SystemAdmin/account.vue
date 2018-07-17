<template>
  <v-card class="card-content">
    <v-flex xs12 class="pa-2 px-3 item-tittle">
      <v-layout row wrap>
        <v-flex xs8 class="force-center-left">
          Account Management
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
          :items="items"
          :pagination.sync="pagination">
          <template slot="items" slot-scope="props">
              <td>{{ props.item.Email }}</td>
              <td>{{ props.item.fullName }}</td>
              <td class="text-xs-center">{{ props.item.Type }}</td>
              <td class="text-xs-center">
                <v-btn icon class="mx-0 cst-disable">
                  <v-icon :color="props.item.Status?'green':'pink'">{{props.item.Status?'check_circle':'cancel'}}</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-center">
                <v-btn icon class="mx-0" @click="Edit(props.item)">
                  <v-icon color="blue darken-1">edit</v-icon>
                </v-btn>
              </td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="red darken-1" icon="warning">
              Request Empty
            </v-alert>
          </template>
      </v-data-table>
      <div class="cst-dialog-cont" v-if="popup">
        <div class="button-cont">
          <v-btn icon small @click="close"><v-icon color="white">close</v-icon></v-btn>
          <div class="cst-dialog-item white" style="height: 300px">
            <v-flex xs12 class="cst-dialog-item-title blue darken-1 white--text">
              <v-icon class="mr-2" dark>edit</v-icon>
              Edit
            </v-flex>
            <v-flex xs12 class="pa-3 pt-5">
              <v-flex xs12 class="mb-4">
                <div class="cst-form-textfield">
                  <label>Email</label>
                  <v-text-field class="pa-0"
                    hide-details
                    v-model="selected.Email"
                    label=" "
                    placeholder="Type here..."/>
                </div>
                <div class="cst-form-textfield">
                  <label>Name</label>
                  <v-text-field class="pa-0"
                    v-model="selected.fullName"
                    hide-details
                    label=" "
                    placeholder="Type here..."/>
                </div>
              </v-flex>
              <v-flex xs12>
                <div class="cst-form-textfield">
                  <label>Type</label>
                  <v-radio-group v-model="selected.Type" :mandatory="false">
                    <v-radio color="primary" label="Member" value="Member"></v-radio>
                    <v-radio color="primary" label="AdminResto" value="AdminResto"></v-radio>
                    <v-radio color="primary" label="System" value="System"></v-radio>
                  </v-radio-group>
                </div>
                <div class="cst-form-textfield">
                  <label>Status</label>
                  <v-checkbox v-model="selected.Status" color="primary" hide-details value></v-checkbox>
                </div>
              </v-flex>
            </v-flex>
            <div class="cst-dialog-item-footer">
              <v-btn @click="save" small class="blue darken-1 white--text">Save</v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-flex>
  </v-card>
</template>
<script>
import Service from '@/api/systemadmin.js'
export default {
  data: () => ({
    pagination: {
      sortBy: 'Status'
    },
    items: [],
    searchF: '',
    selected: {},
    popup: false,
    headers: [
      {text: 'Email', value: 'Email', sortable: false},
      {text: 'Name', value: 'fullName', sortable: false},
      {text: 'Type', value: 'Type', sortable: false, align: 'center'},
      {text: 'Status', value: 'Status', sortable: false, align: 'center'},
      {text: 'Edit', value: ' ', width: '30px', sortable: false, align: 'center'}]
  }),
  methods: {
    refresh () {
      Service.getTbUserAll(this).then(list => {
        this.items = list.data
      })
    },
    Edit (item) {
      // Object.assign(this.selected,item)
      this.selected = JSON.parse(JSON.stringify(item))
      this.popup = true
    },
    close () {
      this.selected = {}
      this.popup = false
    },
    save () {
      Service.updateTbUser(this, this.selected).then(res => {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Save Success',
          status: true,
          color: 'green'
        })
        this.refresh()
        this.popup = false
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
