<template>
  <v-flex xs12 class="pa-0 item-content">
    <div class="addDiv" @click="click">
      <v-icon dark size="40px">add</v-icon>
      <input @change="fileChange" type="file" id="target" style="display: none" multiple accept="image/*"/>
    </div>
    <v-flex xs12 class="gallery-cont mb-5">
      <v-layout row wrap>
        <div v-if="Items.length == 0" class="nodata">No Data Available</div>
        <v-flex xs3 v-for="(item,i) in Items" :key="i">
          <div class="item-img">
            <img :src="item.src" style="width:100%;height:100%;">
          </div>
          <div class="footer-btn pa-1">
            <v-menu offset-x >
              <v-btn slot="activator" :color="getColor(item.Type)" icon class="ma-0 mx-1 x-small"><v-icon small color="white">stars</v-icon></v-btn>
              <v-card class="btn-type">
                <v-flex @click="changeType(item,item2.Type)" xs12 class="pa-1" v-for="(item2,i) in itemType" :key="i">
                  <v-btn :color="item2.color" icon class="ma-0 mx-1 x-small"><v-icon small color="white">stars</v-icon></v-btn>
                </v-flex>
              </v-card>
            </v-menu>
            <v-btn @click="deleteItem(item,i)" color="error" icon class="ma-0 mx-1 x-small"><v-icon small color="white">delete</v-icon></v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="card-footer-cst">
      <v-layout row wrap class="px-4">
        <v-flex xs3 v-for="(item,i) in itemType" :key="i">
          <v-btn :color="item.color" small icon class="ma-0 mx-1 x-small">
            <v-icon small color="white">stars</v-icon>
          </v-btn>
          <span class="label">{{item.Title}}</span>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-flex>
</template>
<script>
import AdminResto from '@/api/adminresto.js'
export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: new Array(0)
    },
    restoId: {
      value: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      Items: this.value,
      itemType: [
        {Id: 0, Type: 'both', Title: 'Front / Detail Photo', color: 'orange'},
        {Id: 1, Type: 'default', Title: 'Front Photo', color: 'primary'},
        {Id: 2, Type: 'detail', Title: 'Detail Photo', color: 'green'},
        {Id: 3, Type: 'normal', Title: 'normal', color: 'black'}
      ]
    }
  },
  methods: {
    click () {
      document.getElementById('target').click()
    },
    fileChange (e) {
      let tmp = []
      let tl = e.target.files.length || e.dataTransfer.files.length
      if (tl) {
        tmp = Array.from(e.target.files)
      }
      AdminResto.updateTbRestoGallery(this, tmp, this.restoId).then(res => {
        res.data.forEach((val, index) => {
          let x = new Blob([new Uint8Array(val.file.data)])
          let showImg = URL.createObjectURL(x)
          val.src = showImg
          this.Items.push(val)
        })
      })
    },
    getColor (e) {
      return e === 'normal' ? 'black' : e === 'detail' ? 'green' : e === 'both' ? 'orange' : 'primary'
    },
    deleteItem (item, i) {
      AdminResto.deleteTbRestoGallery(this, item).then(res => {
        this.Items.splice(i, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    changeType (item, item2) {
      if (item2 !== 'normal') { // function for change active state to normal
        let tmpItem = []
        if (item2 === 'both') { // for type both -> get Item front and detail (ListFilter)
          tmpItem = this.Items.filter((e) => {
            if (e.Type === 'both' || e.Type === 'default' || e.Type === 'detail') return true
            else return false
          })
        } else { // for type front / detail -> get Item (ListFilter)
          tmpItem = this.Items.filter((e) => {
            if (e.Type === 'both' || e.Type === item2) return true
            else return false
          })
        }
        if (tmpItem.length !== 0) { // update ListFilter to normal
          let Id = []
          tmpItem.forEach((val, index) => {
            val.Type = 'normal'
            Id.push(val.Id)
          })
          AdminResto.setTbRestoGalleryNormal(this, Id)
        }
      }
      item.Type = item2
      AdminResto.setTbRestoGallery(this, item)
    }
  }
}
</script>
<style scoped>
.gallery-cont{
  overflow-y: scroll;
  border:1px solid #dedede;
  max-height:400px;
}
.addDiv {
  width: 100%;
  height: 50px;
  background: black;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addDiv:hover {
  opacity: 0.2;
  cursor: pointer;
}
.footer-btn{
  display: flex;
  justify-content: center;
  border: 1px solid #dedede;
  border-top: none;
  background: #F5F5F5;
}
.item-img{
  position: relative;
  border: 1px solid #dedede;
  height: 130px;
}
.card-footer-cst{
  text-align: center;
  color: #424242;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background:#f5f5f5;
  border-top: 1px solid #dedede;
}
.x-small{
  width: 20px;
  height: 20px;
}
.btn-type >>> .flex:hover{
  background: #E0E0E0;
}
.nodata{
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  font-size: 16px;
  color: #424242;
}
</style>
