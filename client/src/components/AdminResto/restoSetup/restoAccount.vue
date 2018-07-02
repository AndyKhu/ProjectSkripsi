<template>
  <v-layout row wrap>
    <v-flex xs6 class="pb-0">
      <formTextField v-model="Name" :label="'Bank Name'"/>
    </v-flex>
    <v-flex xs6 class="pb-0">
      <formTextField v-model="Account" :label="'Account Number'"/>
    </v-flex>
    <v-flex xs12 class="pt-0" text-xs-center>
      <v-btn @click="add" small color="primary"> add </v-btn>
      <v-data-table color="primary"
        class="table-cst mt-3"
        :headers="headers"
        :items="Items"
        hide-actions>
          <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.BankName }}</td>
              <td class="text-xs-left">{{ props.item.AccountNumber }}</td>
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
      Name: null,
      Account: null,
      Items: this.value,
      headers: [
        {text: 'Bank Name', value: 'name', sortable: false},
        {text: 'Account Number', value: 'account', sortable: false},
        {text: 'Actions', value: ' ', width: '30px', sortable: false}]
    }
  },
  methods: {
    add () {
      if (this.Name !== null && this.Name !== '') {
        this.Items.push({Id: helper.getGuid(), BankName: this.Name, AccountNumber: this.Account, Id_Resto: this.restoId})
        this.Name = null
        this.Account = null
        this.input()
      } else {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Bank Name Can`t be empty',
          status: true,
          color: 'error'
        })
      }
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
