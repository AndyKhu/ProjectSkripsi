<template>
  <v-text-field v-bind="$attrs" :value="formatted" @input="input" type="text" @keydown.native="keydown"></v-text-field>
</template>

<script>
import numformat from '@/assets/js/accounting.min.js'

export default {
  name: 'NumberTextField',
  props: {
    value: [String, Number],
    required: false,
    default: ''
  },
  computed: {
    formatted () {
      return numformat.formatNumber(parseInt(this.value), 0, '.', ',')
    }
  },
  methods: {
    input (value) {
      this.$emit('input', parseInt(numformat.unformat(value, ',')))
    },
    keydown (event) {
      const keyCodes = [
        9, // tab
        8, // backspace
        35, // end
        36, // home
        37, // arrow left
        38, // arrow up
        39, // arrow right
        40, // arrow down
        46 // delete
      ]
      if ((event.keyCode < 48 || event.keyCode > 57) &&
          (event.keyCode < 96 || event.keyCode > 105) &&
          !keyCodes.includes(event.keyCode)) {
        event.preventDefault()
      }
    }
  }
}
</script>
