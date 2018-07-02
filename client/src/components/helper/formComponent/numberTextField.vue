<template>
  <div class="component-cont mb-3">
    <label class="mb-2">{{label}}</label>
    <div class="component-item">
      <v-text-field class="pa-0 px-3"
        v-bind="$attrs"
        hide-details
        :value="formatted"
        @input="input"
        type="text"
        @keydown.native="keydown"/>
    </div>
  </div>
</template>

<script>
import numformat from '@/assets/js/accounting.min.js'

export default {
  name: 'NumberTextField',
  props: {
    value: {
      value: [String, Number],
      required: false,
      default: ''
    },
    label: {
      type: String,
      require: false,
      default: ''
    }
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
<style scoped>
.component-cont{
  display: flex;
  flex-direction: column;
}
.component-cont label{
  color: #616161;
  font-size: 16px;
}
.component-cont >>> input {
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
