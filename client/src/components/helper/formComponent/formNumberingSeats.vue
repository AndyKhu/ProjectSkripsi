<template>
  <div class="component-cont mb-3">
    <label class="mb-2">{{label}}</label>
    <div class="component-item">
      <v-layout row wrap class="px-3">
        <v-flex xs2 v-for="(item,i) in dataArr" :key="i">
          <v-text-field class="pa-0"
            v-bind="$attrs"
            hide-details
            :value="item"
            @input="input"
            type="text"
            @keydown.native="keydown"/>
        </v-flex>
      </v-layout>
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
    NoSeat: {
      value: Number,
      required: true,
      default: 1
    },
    label: {
      type: String,
      require: false,
      default: ''
    }
  },
  data () {
    return {
      Items: []
    }
  },
  computed: {
    formatted () {
      return numformat.formatNumber(parseInt(this.value), 0, '.', ',')
    },
    dataArr: {
      get () {
        let a = []
        for (let i = 0; i < this.NoSeat; i++) {
          a.push(0)
        }
        return a
      },
      set (value) {
      }
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
