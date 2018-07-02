<template>
  <v-list dark class="nav-left-cst">
    <v-list-tile  v-for="item in value" :key="item.Tittle" avatar @click="changeclass(item)" :class="item.active?'activeit':''">
      <v-list-tile-avatar class="mw-35" :size="30">
        <v-icon>{{item.Icon}}</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{item.Tittle}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      required: false
    }
  },
  methods: {
    changeclass (item) {
      this.$emit('changeclass', item)
    }
  }
}
</script>
<style scoped>
.nav-left-cst{
  height: 100%;
}
.activeit{
  background: #1976d2;
}
.mw-35{
  min-width: 35px;
}
</style>
