<template>
  <div class="component-cont" :class="noPadding?'':labelC?'inputCenter mb-3':'mb-3'">
    <label v-if="!noPadding" :class="brbtm?labelC?'text-xs-center':'':'mb-2'">{{label}}</label>
    <v-text-field class="pa-0" :class="noPadding?'no-border-bottom':brbtm?'brbtm px-3':'px-3'"
      v-bind="$attrs"
      v-model="comData"
      hide-details>
    </v-text-field>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String / Number,
      require: false,
      default: ''
    },
    label: {
      type: String,
      require: false,
      default: ''
    },
    brbtm: {
      type: Boolean,
      require: false,
      default: false
    },
    labelC: {
      type: Boolean,
      require: false,
      default: false
    },
    noPadding: {
      type: Boolean,
      require: false,
      default: false
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
<style scoped>
.component-cont{
  display: flex;
  flex-direction: column;
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
.inputCenter >>> input {
  text-align: center;
}
.brbtm >>> input {
  border: none;
  border-bottom: 1px solid #dedede;
}
.no-border-bottom >>> input {
  border: none;
  border-top: 1px solid #dedede;
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
