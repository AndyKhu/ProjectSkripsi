<template>
   <v-container fluid grid-list-xl class="form-cont-detail">
    <v-layout row wrap class="pad-bot-80px">
         <v-flex xs12 lg6>
            <v-text-field
            v-model="data.mn"
            label="Menu Name" light
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            v-model="data.price"
            label="Price" light
            mask="########"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            v-model="data.md"
            multi-line
            label="Menu Description" light
            rows="2"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-layout row>
                <v-flex xs8 lg11>
                <v-text-field
                v-model="xs"
                label="Menu Picture" light
                placeholder=" "
                ></v-text-field>
                </v-flex>
                <v-flex xs4 lg1 class="center-middle">
                    <fileupload class="btn-primary-cst"
                            extensions="gif,jpg,jpeg,png,webp"
                            v-model="fin"
                            accept="image/png,image/gif,image/jpeg,image/webp"
                            :multiple="false"
                            :size="1024 * 1024 * 10"
                            @input="updatetValue"
                            ref="upload">
                                <i class="fa fa-upload"></i>
                        </fileupload>
                </v-flex>
            </v-layout>
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
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.price }}</td>
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
import fileupload from 'vue-upload-component'
import auth from '../../../router/auth'
import gv from '../../../globalvariable'
import axios from 'axios'
export default {
  data: () => ({
    a: [],
    ROOT_URL: gv.ROOT_URL,
    xs: '',
    fin: [],
    data: {
      mn: '',
      md: '',
      price: '',
      mp: '',
      mpt: ''
    },
    items: [],
    headers: [
        {text: 'Name', value: 'name', sortable: false},
        {text: 'Price', value: 'price', sortable: false},
        {text: 'Actions', value: ' ', width: '30px', sortable: false}]
  }),
  methods: {
    add () {
      let formdata = new FormData()
      for (let key in this.fin) {
        let obj = this.fin[key]
        formdata.append('img', obj.file)
      }
      axios.post(`${this.ROOT_URL}/api/uploads/${auth.user.userid}/2`, formdata)
      .then(res => {
        this.items.push({
          value: true,
          name: this.data.mn,
          price: this.data.price,
          md: this.data.md,
          mp: res.data.fileid,
          mpt: res.data.filetype
        })
        this.data = {
          mn: '',
          md: '',
          price: '',
          mp: '',
          mpt: ''
        }
        this.xs = ''
      })
      .catch(() => {
        console.log('error')
      })
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },
    updatetValue (value) {
      this.xs = value[0] ? value[0].name : ''
      this.data.mp = value[0] ? value[0].file : ''
    }
  },
  components: {
    fileupload
  }
//   mounted () {
//     this.role = auth.user.role
//     this.username = auth.user.username
//   }
}
</script>