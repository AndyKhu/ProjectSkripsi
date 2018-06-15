<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class="card-content">
          <v-flex xs12 class="pa-2 px-3 item-tittle">
            Restaurant Gallery
          </v-flex>
          <v-flex xs12 class="pa-2 px-3 item-content">
            <div class="addDiv" @click="click">
              <v-icon dark size="40px">add</v-icon>
              <input @change="test" type="file" id="target" style="display: none" multiple accept="image/*"/>
            </div>
            <v-layout row wrap>
              <v-flex xs4 v-for="(item,i) in previewImg" :key="i" @click="delitem(i)">
                <div class="item-img">
                  <div class="deleteC">
                    <v-icon dark large>delete</v-icon>
                  </div>
                  <img :src="item.src" style="width:100%;height:100%;">
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>300px
<script>
export default {
  props: {
    value: {
      type: Array,
      required: false
    },
    deleted: {
      type: Array,
      required: false
    }
  },
  data: () => ({
    glp: [],
    deletedF: []
  }),
  methods: {
    click () {
      document.getElementById('target').click()
    },
    test (e) {
      let tmp = []
      let tl = e.target.files.length || e.dataTransfer.files.length
      if (tl) {
        tmp = Array.from(e.target.files)
      }
      for (let x in tmp) {
        this.glp.push({file: tmp[x]})
      }
      this.$emit('input', this.glp)
    },
    delitem (index) {
      if (this.glp[index].Id !== undefined && this.glp[index].Id !== null) {
        this.deletedF.push(this.glp[index])
      }
      this.glp.splice(index, 1)
      this.$emit('DeletedInput', this.deletedF)
      this.$emit('input', this.glp)
    }
  },
  computed: {
    previewImg: {
      get () {
        let tmp = []
        for (let i = 0; i < this.glp.length; i++) {
          tmp.push({src: URL.createObjectURL(this.glp[i].file)})
        }
        return tmp
      }
    }
  },
  mounted () {
    this.glp = this.value
    this.deletedF = this.deleted
  }
}
</script>
<style scoped>
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
.deleteC{
  position: absolute;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: black;
  -webkit-transition: opacity 500ms linear;
  -ms-transition: opacity 500ms linear;
  transition: opacity 500ms linear;
}
.item-img{
  position: relative;
  height: 150px;
  cursor: pointer;
}
.item-img:hover > .deleteC{
  opacity: 1;
}
</style>
