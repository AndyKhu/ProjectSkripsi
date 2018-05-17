<template>
  <v-container fluid grid-list-lg v-if="loaded">
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
      <v-speed-dial
        v-model="fab"
        fixed bottom right direction="top" :open-on-hover="false" transition="slide-y-reverse-transition">
        <v-btn slot="activator"
          v-model="fab" color="blue darken-2" small dark fab hover>
          <v-icon class="d-flex">more_vert</v-icon>
          <v-icon class="d-flex">close</v-icon>
        </v-btn>
        <v-btn @click="save" fab small dark color="green"><v-icon class="d-flex">save</v-icon></v-btn>
        <router-link :to="{name: 'RestoFac'}"><v-btn fab small dark color="indigo"><v-icon class="d-flex">chevron_right</v-icon></v-btn></router-link>
      </v-speed-dial>
    </v-layout>
  </v-container>
  <div v-else>Loading</div>
</template>
<script>
import auth from '@/api/auth.js'

export default {
  name: 'Resto-Fac',
  components: {
  },
  data: () => ({
    loaded: false,
    User: null,
    fab: false,
    a: [],
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
      this.items.push({value: true, Name: this.fn, Icon: this.selecticons, Id_Resto: this.User.userResto.Id})
      this.fn = ''
      this.selecticons = 'help'
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },
    save () {
      console.log(this.items)
    }
  },
  mounted () {
    if (this.$store.getters['getUser'] === null) {
      auth.getUser(this).then(() => {
        this.User = this.$store.getters['getUser']
        if (this.User.userResto != null) {
          this.items = this.User.userResto.Tb_Resto_Facs
        }
        this.loaded = true
      })
    } else {
      this.User = this.$store.getters['getUser']
      if (this.User.userResto != null) {
        this.items = this.User.userResto.Tb_Resto_Facs
      }
      this.loaded = true
    }
  }
}
</script>
<style scoped>
form{
  font-family: arial;
}
.item-tittle{
  border-bottom: 1px solid #E0E0E0;
  font-size: 18px;
  color: #616161;
  font-family: arial;
}
.item-content{
  font-family: serif;
}
.card-content{
  min-height: 550px;
}
</style>
