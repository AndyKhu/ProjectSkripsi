<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class="card-content">
          <v-flex xs12 class="pa-2 px-3 item-tittle">
            Restaurant Facilities
          </v-flex>
          <v-flex xs12 class="pa-2 px-3 item-content">
            <v-container fluid grid-list-xl class="form-cont-detail">
              <v-layout row wrap class="pad-bot-80px">
                  <v-flex xs12 lg6>
                      <v-text-field
                      v-model="fn"
                      label="Facility Name" light
                      placeholder=" "
                      ></v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                      <v-select
                      :items="icons"
                      v-model="selecticons"
                      label="Icons"
                      item-text="state"
                      item-value="abbr"
                      auto
                      :append-icon="selecticons"
                      ></v-select>
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
                              <td>{{ props.item.Name }}</td>
                              <td><v-icon>{{ props.item.Icon }}</v-icon></td>
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
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Resto-Fac',
  props: {
    value: {
      type: Array,
      required: false
    }
  },
  data: () => ({
    fn: '',
    selecticons: 'help',
    icons: [
      { state: 'Help', abbr: 'help' },
      { state: 'Wifi', abbr: 'wifi' },
      { state: 'Television', abbr: 'tv' },
      { state: 'Plugs', abbr: 'fa-plug' },
      { state: 'Air Conditioner', abbr: 'fa-asterisk' },
      { state: 'Master Card', abbr: 'fa-cc-mastercard' },
      { state: 'Music', abbr: 'fa-music' }],
    items: [],
    headers: [
      {text: 'Facility Name', value: 'name', sortable: false},
      {text: 'Icons', value: 'icon', sortable: false},
      {text: 'Actions', value: ' ', width: '30px', sortable: false}]
  }),
  methods: {
    add () {
      this.items.push({Name: this.fn, Icon: this.selecticons})
      this.fn = ''
      this.selecticons = 'help'
      this.$emit('input', this.items)
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
      this.$emit('input', this.items)
    }
  },
  mounted () {
    this.items = this.value
  }
}
</script>
