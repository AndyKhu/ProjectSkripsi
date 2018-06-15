<template>
  <v-list dark class="mw-220">
    <v-list-tile  v-for="item in value" :key="item.Tittle" avatar @click="changeclass(item.Tittle)" :class="item.active?'activeit':''">
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
  data: () => ({
  }),
  methods: {
    changeclass (item) {
      this.$emit('changeclass', item)
    }
  },
  mounted () {}
}
</script>
