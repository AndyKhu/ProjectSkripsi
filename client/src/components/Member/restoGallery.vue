<template>
  <v-container fluid grid-list-lg class="pa-0">
    <v-layout row wrap>
      <v-flex xs6 md3 lg3 v-for="(item,i) in resto.Gallery" :key="i">
        <div class="item-img">
          <img :src="item.src" style="width:100%;height:100%;">
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    resto: {
      value: Object,
      required: true,
      default: {}
    }
  }
}
</script>
<style scoped>
.item-img{
  position: relative;
  border: 1px solid #dedede;
  height: 130px;
}
</style>
