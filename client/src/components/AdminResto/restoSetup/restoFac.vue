<template>
  <v-layout row wrap>
    <v-flex xs6 class="pb-0">
      <formTextField v-model="Name" :label="'Facility Name'"/>
    </v-flex>
    <v-flex xs6 class="pb-0">
      <formComboBox v-model="Icon" :label="'Icon'" :Items="iconItems" :previewIcon="Icon"/>
    </v-flex>
    <v-flex xs12 class="pt-0" text-xs-center>
      <v-btn @click="add" small color="primary"> add </v-btn>
      <v-data-table color="primary"
        class="table-cst mt-3"
        :headers="headers"
        :items="Items"
        hide-actions>
          <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.Name }}</td>
              <td class="text-xs-left"><v-icon>{{ props.item.Icon }}</v-icon></td>
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
      Icon: 'wifi',
      Items: this.value,
      iconItems: [
        { caption: 'Wifi', value: 'wifi' },
        { caption: 'Help', value: 'help' },
        { caption: 'Television', value: 'tv' },
        { caption: 'Plugs', value: 'power' },
        { caption: 'Air Conditioner', value: 'toys' },
        { caption: 'Master Card', value: 'credit_card' },
        { caption: 'Music', value: 'music_note' }],
      headers: [
        {text: 'Facility Name', value: 'name', sortable: false},
        {text: 'Icons', value: 'icon', sortable: false},
        {text: 'Actions', value: ' ', width: '30px', sortable: false}]
    }
  },
  methods: {
    add () {
      if (this.Name !== null && this.Name !== '') {
        this.Items.push({Id: helper.getGuid(), Name: this.Name, Icon: this.Icon, Id_Resto: this.restoId})
        this.Name = null
        this.Icon = 'wifi'
        this.input()
      } else {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Facility Name Can`t be empty',
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
