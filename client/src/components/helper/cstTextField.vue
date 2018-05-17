<template>
  <v-layout row>
    <v-flex xs1>
      <label>{{label}}</label>
    </v-flex>
    <v-flex xs10>
      <input v-model="comData" type="text">
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      require: false,
      default: ''
    },
    label: {
      type: String,
      require: false,
      default: ''
    }
  },
  computed: {
    comData: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  }
}
</script>
