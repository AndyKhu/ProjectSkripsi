<template>
  <v-flex xs12 class="pa-0" v-if="form">
    <div v-if="value.length == 0" class="empty">
      Empty Menu...
    </div>
    <v-layout row wrap v-else>
      <v-flex xs4 v-for="(item,i) in value" :key="i">
        <div class="card-food-menu-cont">
          <v-card-media class="cursorP" :src="item.src?item.src:'http://via.placeholder.com/280x170'" height="170px" cover @click="edit(item)">
          </v-card-media>
          <div class="price-cst-cont">
            <div class="price-cst">
              <p class="price-text">{{priceFormated(item.Price)}}</p>
            </div>
          </div>
          <v-layout row wrap class="mx-2 mb-0">
          <v-flex xs10>
            {{formatTitle(item.Name)}} <br>
            <span class="foodmenu-subtittle">{{item.Description}}</span>
          </v-flex>
          <v-flex xs2 class="pa-0 card-food-action">
            <v-btn icon class="ma-0" @click="delMenu(item,i)">
              <v-icon color="error">delete</v-icon>
            </v-btn>
          </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
  <v-flex xs12 class="pa-0" v-else>
    <v-layout row wrap>
      <v-flex xs6 class="pb-0">
        <formTextField v-model="formData.Name" :label="'Name'"/>
        <formComboBox v-model="formData.Type" :label="'Type'" :Items="foodCategory"/>
        <formUploadImg v-model="formData.Img" :label="'Picture'"/>
      </v-flex>
      <v-flex xs6 class="pb-0">
        <formNumberField v-model="formData.Price" :label="'Price'"/>
        <formTextField rows="4" multi-line v-model="formData.Description" :label="'Description'"/>
      </v-flex>
      <v-flex xs12 class="pt-0 text-xs-right">
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import AdminResto from '@/api/adminresto.js'
import helper from '@/api/helper'
export default {
  props: {
    value: {
      value: Array,
      required: true,
      default: []
    },
    form: {
      value: Boolean,
      required: true,
      default: true
    },
    restoId: {
      value: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      ListMenu: this.value,
      foodCategory: ['Food', 'Drink'],
      formData: {
        Id: null,
        Name: null,
        Price: null,
        Img: null,
        Type: 'Food',
        Description: null
      }
    }
  },
  methods: {
    async edit (item) {
      await AdminResto.getFoodImage(this, this.restoId, item.PID).then(cb => {
        let tmp = new File([new Uint8Array(cb.data.file.data)], 'tmp')
        this.formData = {
          Id: item.Id,
          Name: item.Name,
          Price: item.Price,
          Img: tmp,
          PID: item.PID,
          Type: item.Type,
          Description: item.Description
        }
      })
      this.$emit('formC', false)
    },
    save () {
      AdminResto.updateTbRestoMenu(this, this.formData, helper.getGuid(), this.restoId).then(cb => {
        if (this.formData.Id) {
          if (this.formData.Img) {
            // let x = new Blob([this.formData.Img])
            let showImg = URL.createObjectURL(this.formData.Img)
            this.formData.src = showImg
            delete this.formData.Img
            this.ListMenu.splice(this.ListMenu.indexOf(this.ListMenu.filter((e) => { return e.Id === this.formData.Id })[0]), 1)
            this.ListMenu.push(this.formData)
            this.$emit('input', this.ListMenu)
            this.$emit('formC', true)
            this.$store.dispatch('setDialogMsg', {
              txtmsg: 'Save Success',
              status: true,
              color: 'success'
            })
            this.formData = {
              Name: null,
              Price: null,
              Img: null,
              Type: 'Food',
              Description: null
            }
          }
        } else {
          if (cb.data.file) {
            let x = new Blob([new Uint8Array(cb.data.file.data)])
            let showImg = URL.createObjectURL(x)
            cb.data.src = showImg
            delete cb.data.file
          }
          this.ListMenu.push(cb.data)
          this.$emit('input', this.ListMenu)
          this.$emit('formC', true)
          this.$store.dispatch('setDialogMsg', {
            txtmsg: 'Save Success',
            status: true,
            color: 'success'
          })
          this.formData = {
            Name: null,
            Price: null,
            Img: null,
            Type: 'Food',
            Description: null
          }
        }
      })
    },
    priceFormated (value) {
      let tmp = value / 1000
      if (value < 1000) return tmp
      else return tmp.toFixed(1)
    },
    formatTitle (string) {
      return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1)
    },
    delMenu (item, index) {
      AdminResto.deleteTbRestoMenu(this, item.Id, item.PID, this.restoId)
      this.ListMenu.splice(index, 1)
      this.$emit('input', this.ListMenu)
    }
  }
}
</script>
<style scoped>
.input-tools-cont{
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  top: 43px;
  justify-content: center;
}
.card-food-menu-cont{
  border: 1px solid #dedede;
  position: relative;
}
.foodmenu-tittle{
  background: #f5f5f5;
  font-size: 16px;
  font-weight: bold;
  color: #757575  ;
  border-bottom: 1px solid #dedede;
}
.cursorP{
  cursor: pointer;
}
.card-food-action{
  display: flex;
  justify-content: center;
  align-items: center;
}
.foodmenu-subtittle{
  font-size: 12px;
  color: #757575;
}
.price-cst-cont{
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
}
.price-cst{
  background: #73c01b;
  width: 25px;
  height: 25px;
  position: relative;
  text-align: center
}
.price-cst:before, .price-cst:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background: #73c01b;
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
    font-size: 13px;
    left: 0;
    right: 0;
    width: 25px;
    height: 25px;
    bottom: 0;
    top: 0;
    margin: auto;
    color: #ffffff;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
