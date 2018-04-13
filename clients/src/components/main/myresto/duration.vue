<template>
  <v-container fluid grid-list-xl class="form-cont-detail">
    <v-layout row wrap class="pad-bot-80px">
        <v-flex xs12 lg12>
            <v-text-field
            v-model="fn"
            label="Duration" light
            type="numbers"
            mask="###"
            suffix="Minute"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 text-xs-center>
            <v-btn @click="add()" small color="primary">
                add
            </v-btn>
        </v-flex>
        <v-flex xs12>
            <v-data-table color="primary"
                :headers="headers"            
                :items="items"
                hide-actions>
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.min }}</td>
                    <td>
                       <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                            <v-icon color="pink">delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    a: [],
    fn: '',
    items: [],
    headers: [
        {text: 'Minute', align: 'center', value: 'min', sortable: false},
        {text: 'Actions', value: ' ', width: '30px', sortable: false}]
  }),
  methods: {
    add () {
      this.items.push({value: true, min: this.fn})
      this.fn = ''
      this.selecticons = 'help'
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    }
  }
//   mounted () {
//     this.role = auth.user.role
//     this.username = auth.user.username
//   }
}
</script>