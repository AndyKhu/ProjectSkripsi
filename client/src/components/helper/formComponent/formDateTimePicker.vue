<template>
  <div class="component-cont" :class="inLine?'rowFixed':'mb-3'">
    <label :class="inLine?'':'mb-2'">{{label}}</label>
    <v-menu ref="picker"
            lazy
            :close-on-content-click="dateOnly ? true : false"
            v-model="picker"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            :disabled="disabled"
            min-width="290px">
      <v-text-field slot="activator"
            class="pa-0 px-3"
            :class="tclass"
            hide-details
            :append-icon="'date_range'"
            @keydown.native="keydown"
            placeholder=" "
            v-model="formattedDateTime"
            :disabled="disabled" :rules="rules" :required="required" :clearable="clearable" />
      <v-layout wrap>
        <v-card style="max-width: 290px">
          <v-flex xs12 v-if="!timeOnly">
              <v-date-picker @input="changev" :min="disabledMinDate?null:minDate"
                            :disabled="disabled" :readonly="readonly"
                            v-if="active" v-model="date" no-title scrollable></v-date-picker>
          </v-flex>
          <v-flex xs12 v-if="!dateOnly">
            <v-container fluid grid-list-xs>
            <v-layout row justify-center>
              <v-flex xs3>
                <v-select
                  :items="hour"
                  @input="changev"
                  v-model="hourv"
                  single-line
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex xs2 class="text-xs-center center-item">
                :
              </v-flex>
              <v-flex xs3>
                <v-select
                  :items="minute"
                  @input="changev"
                  v-model="minutev"
                  single-line
                  autocomplete
                ></v-select>
              </v-flex>
            </v-layout>
            </v-container>
          </v-flex>
        </v-card>
      </v-layout>
    </v-menu>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'date-time-picker',
  props: {
    label: {
      type: String,
      require: false,
      default: 'pick a date'
    },
    tclass: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String / Number,
      required: false,
      default: Date.now()
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    format: {
      type: String,
      required: false,
      default: null
    },
    dateOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    timeOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    },
    inLine: {
      type: Boolean,
      required: false,
      default: false
    },
    disabledMinDate: {
      type: Boolean,
      required: false,
      default: false
    },
    cstMinute: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      picker: false,
      datetime: this.value,
      active: true,
      date: moment(this.value || Date.now()).format('YYYY-MM-DD'),
      hourv: moment(this.value || Date.now()).format('HH'),
      minutev: moment(this.value || Date.now()).format('mm'),
      defaultFormat: this.dateOnly ? 'DD MMM YYYY' : 'DD MMM YYYY HH:mm',
      /* eslint-disable */
      hour: ['00','01','02','03','04','05','06','07','08','09',
             '10','11','12','13','14','15','16','17','18','19',
             '20','21','22','23'],
      minute: this.cstMinute? ['00','30'] : ['00','01','02','03','04','05','06','07','08','09',
               '10','11','12','13','14','15','16','17','18','19',
               '20','21','22','23','24','25','26','27','28','29',
               '30','31','32','33','34','35','36','37','38','39',
               '40','41','42','43','44','45','46','47','48','49',
               '50','51','52','53','54','55','56','57','58','59'],
      /* eslint-enable */
      originalValue: this.value
    }
  },
  computed: {
    minDate: {
      get () {
        let currentdate = new Date()
        currentdate.setDate(currentdate.getDate() + 1)
        return moment(currentdate).format('YYYY-MM-DD')
      }
    },
    formattedDateTime: {
      get () {
        return this.datetime === null ? '' : moment(this.datetime).format(this.format || this.defaultFormat)
      },
      set (value) {
        if (this.clearable) {
          this.datetime = this.originalValue
          this.input()
        }
      }
    },
    timestamp () {
      return this.datetime === null ? null : new Date(moment(this.datetime).format(this.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm')).getTime()
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.value = newValue
      this.datetime = this.value
    }
  },
  methods: {
    changev () {
      this.datetime = new Date(moment(this.date + ' ' + this.hourv + ':' + this.minutev + ':00').format('YYYY-MM-DD HH:mm:ss')).getTime()
      this.input()
    },
    clear () {
      this.datetime = this.value || Date.now()
      this.date = moment(this.value || Date.now()).format('YYYY-MM-DD')
      this.hourv = moment(this.value || Date.now()).format('HH')
      this.minutev = moment(this.value || Date.now()).format('mm')
    },
    getdatetime () {
      return this.timestamp
    },
    keydown (event) {
      event.preventDefault()
    },
    setdatetime () {
      this.datetime = Date.now()
    },
    input () {
      this.$emit('input', this.timestamp)
    }
  }
}
</script>
<style scoped>
.center-item{
  display: flex;
  align-items: center;
  justify-content: center;
}
.component-cont{
  display: flex;
  flex-direction: column;
}
.rowFixed{
  flex-direction: row;
  align-items: center;
}
.component-cont label{
  color: #616161;
  font-size: 16px;
}
.component-cont >>> input , .component-cont >>> textarea {
  font-weight: normal;
  font-size: 13px;
  padding: 10px;
  color: #616161 !important;
  border: 1px solid #dedede;
}
.component-cont >>> i {
  min-height: 30px;
  display: flex;
  border: 1px solid #dedede;
  border-left: none;
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
