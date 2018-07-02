<template>
  <div class="component-cont">
    <label class="mb-2">{{label}}</label>
    <div class="img-upload-cont mx-3">
      <div class="img-add" @click="triggerInput" :class="tmpData != null ?'hide':'show'">
        <v-icon dark size="40px">add</v-icon>
        <input @change="changeValue" type="file" id="target" style="display: none" accept="image/*"/>
      </div>
      <img class="cst-upload-img" :src="previewImg" alt="" v-if="tmpData != null">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String / File,
      require: false,
      default: ''
    },
    label: {
      type: String,
      require: false,
      default: ''
    }
  },
  data () {
    return {
      tmpData: this.value
    }
  },
  computed: {
    previewImg: {
      get () {
        let tmp = 'http://via.placeholder.com/90x90'
        if (this.tmpData instanceof File) {
          if (this.tmpData !== null) {
            tmp = URL.createObjectURL(this.tmpData)
          }
        }
        return tmp
      }
    }
  },
  methods: {
    triggerInput () {
      document.getElementById('target').click()
    },
    changeValue (e) {
      let tl = e.target.files.length
      if (tl !== 0) {
        this.tmpData = e.target.files[0]
      }
      this.$emit('input', this.tmpData)
    }
  }
}
</script>
<style scoped>
.img-upload-cont{
  position:relative;
  height:200px;
  border: 1px solid #dedede ;
  display: flex;
  flex: 1 1;
  justify-content: center;
  align-items: center;
}
.img-add{
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}
.cst-upload-img{
  max-width: 100%;
  max-height: 100%;
}
.show{
  opacity: 0.1;
}
.hide{
  opacity: 0;
}
.img-add:hover{
  opacity: 0.5;
}
.component-cont{
  display: flex;
  flex-direction: column;
}
.component-cont label{
  color: #616161;
  font-size: 16px;
}
.component-cont >>> input , .component-cont >>> textarea {
  font-weight: normal;
  font-size: 13px;
  padding: 10px;
  color: #616161 !important;
  border: 1px solid #dedede;
}
.component-cont >>> .input-group__selections{
  justify-content: center;
}
.component-cont >>> .input-group__selections__comma{
  color: #616161 !important;
}
.component-cont >>> .input-group__details:before{
  content: none;
}
</style>
