<template>
  <div class="component-cont mb-3">
    <label class="mb-2">{{label}}</label>
    <div class="component-item">
    <!-- <v-text-field class="pa-0 px-3"
      v-bind="$attrs"
      :value="formatted"
      @input="input"
      type="text"
      @keydown.native="keydown"
      hide-details
      placeholder=" ">
    </v-text-field> -->
    <div class="cst-combobox px-3">
      <v-select class="pa-0"
        v-bind="$attrs"
        max-height="200px"
        :items="Day"
        @input="input"
        :value="value"
        hide-details
        single-line
        item-text="caption"
        item-value="value"
        autocomplete/>
    </div>
    <span> - </span>
    <div class="cst-combobox px-3">
      <v-select class="pa-0"
        v-bind="$attrs"
        max-height="200px"
        :items="Day"
        @input="input2"
        :value="DE"
        hide-details
        single-line
        item-text="caption"
        item-value="value"
        autocomplete/>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      value: [String, Number],
      required: false,
      default: ''
    },
    DE: {
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
  data: () => ({
    Day: [
      { caption: 'Monday', value: 1 },
      { caption: 'Tuesday', value: 2 },
      { caption: 'Wednesday', value: 3 },
      { caption: 'Thursday', value: 4 },
      { caption: 'Friday', value: 5 },
      { caption: 'Saturday', value: 6 },
      { caption: 'Sunday', value: 7 }]
  }),
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    input2 (value) {
      this.$emit('DE', value)
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
.component-item{
  display:flex;
  align-items: center;
  flex-direction: row;
}
.cst-combobox{
  display: flex;
  flex: 1 1;
}
 .component-cont >>> input {
  padding: 0 10px;
  font-weight: normal;
  font-size: 13px;
  color: #616161 !important;
  /* border: 1px solid #dedede; */
}
.component-cont >>> .input-group{
  border: 1px solid #dedede;
}
.component-cont >>> .input-group__selections{
  justify-content: center;
}
.component-cont >>> .input-group__selections__comma{
  padding: 0 10px;
  font-weight: normal;
  font-size: 13px;
  color: #616161 !important;
}
.component-cont >>> .input-group__details:before{
  content: none;
}
</style>
