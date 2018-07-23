<template>
  <div class="component-cont mb-3">
    <label class="mb-2">{{label}}</label>
    <div class="component-item-cont">
      <v-text-field class="pa-0 pl-3" id="test"
        v-bind="$attrs"
        mask="##"
        v-model="comData"
        :disabled="disabled"
        hide-details
        @input="updateV"
        placeholder=" ">
      </v-text-field>
      <div class="icon-cst-cont noselect">
        <v-icon @click="up">keyboard_arrow_up</v-icon>
        <v-icon @click="down">keyboard_arrow_down</v-icon>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    value: {
      type: String / Number,
      require: false,
      default: 0
    },
    label: {
      type: String,
      require: false,
      default: ''
    },
    max: {
      type: Number,
      require: false,
      default: 99
    },
    min: {
      type: Number,
      require: false,
      default: 1
    },
    disabled: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data () {
    return {
      comData: this.value
    }
  },
  methods: {
    up () {
      if (!this.disabled) {
        if (this.comData === null || this.comData === '') this.comData = this.min
        else {
          if (this.comData === this.max) this.comData = this.min
          else this.comData++
        }
        this.$emit('input', parseInt(this.comData))
      }
    },
    down () {
      if (!this.disabled) {
        if (this.comData === null || this.comData === '') this.comData = this.min
        else {
          if (this.comData === this.min) this.comData = this.max
          else this.comData--
        }
        this.$emit('input', parseInt(this.comData))
      }
    },
    updateV: _.debounce(function (event) {
      if (parseInt(event) > this.max) {
        this.comData = this.min
      }
      this.$emit('input', parseInt(event))
    }, 500)
  }
  // computed: {
  //   comData: {
  //     get () {
  //       return this.value
  //     }
  //   }
  // }
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
.component-item-cont{
  display: flex;
  width: 70px;
}
.component-cont >>> input , .component-cont >>> textarea {
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
.component-cont >>> .icon-cst-cont{
  display: flex;
  flex-direction: column;
}
.component-cont >>> .icon-cst-cont i{
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.component-cont >>> .icon-cst-cont i:hover{
  color: #000;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
