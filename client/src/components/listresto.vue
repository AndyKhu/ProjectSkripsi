<template>
  <v-container fluid grid-list-lg v-if="detail">
    <v-layout row wrap >
      <v-flex lg3 v-for="n in item" style="cursor: pointer" @click="toDetail(n)"
        :key="n.Id">
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            :src="formatedImg(n)"
          >
          </v-card-media>
          <v-card-title>
            <div>
              <span><h3>{{n.Name}}</h3></span>
              <span>{{n.Description}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <RDetail v-else v-model="selected" @backtolist="detail = true"/>
</template>
<script>
import api from '@/api/helper.js'
import RDetail from '@/components/RestoDetail/index.vue'
export default {
  components: {
    RDetail
  },
  data: () => ({
    item: null,
    detail: true,
    selected: null
  }),
  methods: {
    formatedImg (value) {
      let x = new Blob([new Uint8Array(value.src.data)])
      let src = URL.createObjectURL(x)
      return src.toString()
    },
    toDetail (value) {
      this.detail = false
      this.selected = value
    }
  },
  mounted () {
    api.loadListResto(this)
    this.detail = true
  }
}
</script>
