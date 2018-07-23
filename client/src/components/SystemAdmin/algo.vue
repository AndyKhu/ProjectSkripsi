<template>
  <div v-if="!load">
    <v-btn @click="executeAlgo">test</v-btn>
  </div>
  <div class='container-loading' v-else>
    <div class='loader'>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--dot'></div>
      <div class='loader--text'></div>
    </div>
  </div>
</template>
<script>
import Algorithm from '@/api/algorithm.js'
export default {
  data: () => ({
    load: false
  }),
  methods: {
    executeAlgo () {
      this.load = true
      Algorithm.test(this).then(res => {
        this.load = false
        console.log(res.data)
      })
    }
  }
}
</script>
