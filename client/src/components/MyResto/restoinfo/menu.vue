<template>
   <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class="card-content">
          <v-flex xs12 class="pa-2 px-3 item-tittle">
            <v-layout row wrap>
              <v-flex xs8>
                Restaurant Menu
              </v-flex>
              <v-flex xs4 class="text-xs-right">
                <v-btn depressed outline small class="ma-0 spesial" @click="changeclass(true)" :class="active?'active':''">
                  <v-icon>apps</v-icon>
                </v-btn>
                <v-btn depressed outline small class="ma-0 spesial" @click="changeclass(false)" :class="!active?'active':''">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="item-content pa-0" v-if="active">
            <div v-if="data.length == 0" class="empty">
              Empty Menu...
            </div>
            <v-flex class="pa-3 cst-card-menu" v-else xs12 v-for="(item,i) in ListData" :key="i" @click="toForm(item)">
              <v-layout>
              <v-flex xs3 class="justify-center-fix">
                <v-card-media
                  :src="item.src"
                  style="width:100%"
                  height="100px"
                  cover
                ></v-card-media>
              </v-flex>
              <v-flex xs8>
                <v-flex class="pa-0 item-tittle">{{item.Name}}</v-flex>
                <v-flex>{{item.Description}}</v-flex>
              </v-flex>
              <v-flex xs1 class="justify-center-fix pa-0">
                <div class="price-cst">
                  <p class="price-text">{{priceFormated(item.Price)}}</p>
                </div>
              </v-flex>
              </v-layout>
            </v-flex>
          </v-flex>
          <v-flex xs12 class="pa-2 px-3 item-content" v-else>
            <v-form>
              <v-container grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs12 lg6>
                    <v-text-field
                      v-model="form.Name"
                      label="Name"
                      :disabled="isedit"
                      :error-messages="nameErrors"
                      required
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <number-text-field
                      label="Price"
                      :disabled="isedit"
                      v-model="form.Price"
                      type="number"
                      prefix="Rp."/>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <label style="font-size:12px; color: rgba(0,0,0,.54); display:block">Type</label>
                    <v-select class="pa-0"
                      :items="listType"
                      :disabled="isedit"
                      v-model="form.Type"
                      single-line
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <div style="position:relative;width:90px;height:108px">
                      <label style="font-size:12px; color: rgba(0,0,0,.54); display:block">Picture</label>
                      <div class="addDiv" @click="click">
                      <v-icon dark size="40px">add</v-icon>
                      <input @change="test" type="file" id="target" style="display: none" accept="image/*"/>
                      </div>
                      <img class="cst-upload" height="90px" width="90px" :src="previewImg" alt="">
                    </div>
                  </v-flex>
                  <v-flex xs12 lg12>
                    <v-text-field
                      v-model="form.Description"
                      :disabled="isedit"
                      label="Description"
                      :rows="3"
                      textarea
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-flex>
        </v-card>
      </v-flex>
      <v-speed-dial
        v-if="!active"
        v-model="fab"
        bottom
        fixed
        right
        direction="top">
        <v-btn
          slot="activator"
          v-model="fab"
          color="blue darken-2"
          small
          dark
          fab>
          <v-icon class="d-flex">menu</v-icon>
          <v-icon class="d-flex">close</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          @click="toEdit"
          v-if="isedit"
          color="green">
          <v-icon class="d-flex">edit</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          v-if="!isedit && form.Id != null"
          @click="isedit = true"
          small
          color="red">
          <v-icon class="d-flex">cancel</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          v-if="!isedit"
          @click="save"
          small
          color="indigo">
          <v-icon class="d-flex">save</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          @click="deleteMenu"
          v-if="isedit"
          color="red">
          <v-icon class="d-flex">delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-layout>
   </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import api from '@/api/restoMenuHelper.js'
export default {
  props: {
    value: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    active: true,
    fab: false,
    isedit: true,
    restoData: {},
    data: [],
    listType: ['Food', 'Drink'],
    form: {
      Name: null,
      Price: null,
      Img: null,
      Type: null,
      Description: null
    }
  }),
  mixins: [validationMixin],
  methods: {
    changeclass (val) {
      this.active = val
      if (this.active === false) {
        this.isedit = false
        this.form =
        {
          Name: null,
          Price: null,
          Img: null,
          Type: null,
          Description: null
        }
      }
    },
    click () {
      if (!this.isedit) document.getElementById('target').click()
    },
    test (e) {
      let tl = e.target.files.length
      if (tl !== 0) {
        this.form.Img = e.target.files[0]
      }
    },
    save () {
      api.saveMenu(this, this.form, this.restoData.Id)
    },
    setSuccess () {
      this.$store.dispatch('setDialogMsg', {
        txtmsg: 'Save Success',
        status: true,
        color: 'success'
      })
    },
    setError () {
      this.$store.dispatch('setDialogMsg', {
        txtmsg: 'Save Failed',
        status: true,
        color: 'error'
      })
    },
    priceFormated (value) {
      let tmp = value.toString()
      if (value < 1000) return tmp
      else return tmp.slice(0, tmp.length - 3)
    },
    toForm (value) {
      this.form = this.data.filter(e => { return e.Id === value.Id })[0]
      this.active = false
      this.isedit = true
    },
    toEdit () {
      this.isedit = false
    },
    deleteMenu () {
      api.deleteMenu(this, this.form)
    }
  },
  mounted () {
    this.restoData = this.value === undefined ? [] : this.value
    this.data = this.restoData.Tb_Resto_Menus
  },
  computed: {
    nameErrors () {
      const errors = []
      // if (!this.$v.form.Name.$dirty) return errors
      !this.$v.form.Name.required && errors.push('Name is required.')
      return errors
    },
    previewImg: {
      get () {
        let tmp = 'http://via.placeholder.com/90x90'
        if (this.form.Img !== null) {
          tmp = URL.createObjectURL(this.form.Img)
        }
        return tmp
      }
    },
    ListData: {
      get () {
        let tmp = []
        for (let i = 0; i < this.data.length; i++) {
          tmp.push({src: URL.createObjectURL(this.data[i].Img), Name: this.data[i].Name, Price: this.data[i].Price, Description: this.data[i].Description, Id: this.data[i].Id})
        }
        return tmp
      }
    }
  },
  validations: {
    form: {
      Name: {
        required
      }
    }
  }
}
</script>
<style scoped>
.empty{
  text-align: center
}
.spesial{
  min-width: 0;
  border-color: #bdbdbd
}
.active{
  color: black !important;
  background: #dedede !important;
}
.cst-card-menu{
  border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;
  margin-bottom: 20px;
  cursor: pointer;
}
.cst-card-menu::first-child {
  border-top:none;
}
.addDiv{
  cursor: pointer;
  width: 90px;
  height: 90px;
  position: absolute;
  display: flex;
  align-items: center;
  opacity: 0;
  justify-content: center;
  background: black;
}
.addDiv:hover{
  opacity: 0.5;
}
.price-cst{
  background: #3f51b5;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center
}
.price-cst:before, .price-cst:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 40px;
    background: #3f51b5;
}
.price-cst:before {
    -webkit-transform: rotate(30deg);
       -moz-transform: rotate(30deg);
        -ms-transform: rotate(30deg);
         -o-transform: rotate(30deg);
}
.price-cst:after {
    -webkit-transform: rotate(60deg);
       -moz-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
         -o-transform: rotate(60deg);
}
.price-text {
  z-index: 999;
    font-weight: bold;
    font-size: 18px;
    left: 0;
    right: 0;
    width: 40px;
    height: 25px;
    bottom: 0;
    top: 0;
    margin: auto;
    color: #ffffff;
    position: absolute;
}
</style>
