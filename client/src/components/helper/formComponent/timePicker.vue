<template>
  <v-menu offset-y :close-on-content-click="false" class="px-3 cst-flex">
    <v-text-field class="pa-0 cst-textfield"
      slot="activator"
      v-bind="$attrs"
      v-model="formatedTime"
      mask="##:## AA"
      type="text"
      hide-details
      @keydown.native="keydown"
      placeholder=" ">
    </v-text-field>
    <v-card>
      <v-flex xs12 class="component-title pa-1">Time Picker</v-flex>
      <v-flex xs12 class="pa-1 time-picker-cont">
        <div class="time-picker-item px-2">
          <v-icon large @click="hourUp">keyboard_arrow_up</v-icon>
          <v-text-field mask="##" v-model="HourShow" class="pa-0 time-textfield" fullWidth hide-details/>
          <v-icon large @click="hourDown">keyboard_arrow_down</v-icon>
        </div>
        <div class="time-picker-item px-2">
          <v-icon large @click="minuteUp">keyboard_arrow_up</v-icon>
          <v-text-field mask="##" v-model="MinuteShow" class="pa-0 time-textfield" fullWidth hide-details/>
          <v-icon large @click="minuteDown">keyboard_arrow_down</v-icon>
        </div>
        <div class="time-picker-item px-2">
          <v-icon large @click="changeC">keyboard_arrow_up</v-icon>
          <div class="ma-1">{{ControlShow}}</div>
          <!-- <v-text-field mask="AA" v-model="" class="pa-0 time-textfield" fullWidth hide-details/> -->
          <v-icon large @click="changeC">keyboard_arrow_down</v-icon>
        </div>
      </v-flex>
    </v-card>
  </v-menu>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'
export default {
  props: {
    value: {
      type: String / Number,
      required: true,
      default: Date.now().toString()
    }
  },
  data () {
    return {
      hour: moment(this.value || Date.now()).format('h'),
      minute: moment(this.value || Date.now()).format('m'),
      control: moment(this.value || Date.now()).format('A')
    }
  },
  methods: {
    updateM: _.debounce(function (event) { if (parseInt(event) < 60) { this.minute = parseInt(event) } else this.minute = 0; this.input() }, 500),
    updateH: _.debounce(function (event) { if (parseInt(event) < 13) { this.hour = parseInt(event) } else this.hour = 1; this.input() }, 500),
    updateC: _.debounce(function (event) { this.control = event }, 500),
    hourUp () {
      this.hour++
      if (this.hour >= 13) this.hour = 1
      this.input()
    },
    hourDown () {
      this.hour--
      if (this.hour <= 0) this.hour = 12
      this.input()
    },
    minuteUp () {
      this.minute++
      if (this.minute >= 60) this.minute = 0
      this.input()
    },
    minuteDown () {
      this.minute--
      if (this.minute <= -1) this.minute = 59
      this.input()
    },
    changeC () {
      if (this.control === 'AM') this.control = 'PM'
      else this.control = 'AM'
      this.input()
    },
    input () {
      this.$emit('input', this.timestamp)
    },
    keydown (event) {
      event.preventDefault()
    },
    setValue (tmp) {
      this.hour = moment(tmp).format('h')
      this.minute = moment(tmp).format('m')
      this.control = moment(tmp).format('A')
    }
  },
  computed: {
    MinuteShow: {
      get () {
        if (this.minute < 10) {
          return '0' + this.minute
        }
        return this.minute
      },
      set (value) {
        this.updateM(value)
      }
    },
    HourShow: {
      get () {
        if (this.hour < 10) {
          return '0' + this.hour
        }
        return this.hour
      },
      set (value) {
        this.updateH(value)
      }
    },
    ControlShow: {
      get () {
        return this.control
      },
      set (value) {
        this.updateC(value)
      }
    },
    formatedTime: {
      get () {
        return this.HourShow + ':' + this.MinuteShow + ' ' + this.control
      },
      set (value) {
      }
    },
    timestamp () {
      return new Date(moment(this.formatedTime, 'hh:mm A'))
    }
  },
  mounted () {
    // this.hour = moment(new Date(this.value) || Date.now()).format('h')
    // this.minute = moment(new Date(this.value) || Date.now()).format('m')
    // this.control = moment(new Date(this.value) || Date.now()).format('A')
  }
}
</script>
<style scoped>
.cst-flex{
  display: flex;
  flex: 1 1;
}
.component-title{
  font-size: 14px;
  text-align: center;
  color: #757575;
  background: #dedede;
  border-bottom: 1px solid #9E9E9E;
}
.time-textfield{
  width: 20px
}
.time-textfield >>> input {
  text-align: center
}
.time-picker-cont{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.time-picker-item{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.time-picker-item i {
  font-weight: bold;
  cursor: pointer;
}
.time-picker-item i::selection{
  background: none;
  color: inherit;
}
.time-picker-item i:active{
  color: #424242;
}
.cst-textfield >>> input {
  font-weight: normal;
  font-size: 13px;
  padding: 10px;
  color: #616161 !important;
  border: 1px solid #dedede;
}
.cst-textfield >>> .input-group__selections{
  justify-content: center;
}
.cst-textfield >>> .input-group__selections__comma{
  color: #616161 !important;
}
.cst-textfield >>> .input-group__details:before{
  content: none;
}
</style>
