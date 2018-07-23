<template>
  <div class="component-cont mb-3">
    <label class="mb-2">{{label}}</label>
    <div class="component-item">
      <div class="cst-combobox" :class="noMargin?'':'px-3'">
        <v-select class="pa-0"
          v-bind="$attrs"
          max-height="200px"
          :items="Items"
          @input="input"
          :value="value"
          hide-details
          single-line
          :item-text="itemText"
          :item-value="itemValue"
          autocomplete/>
        <div class="previewIcon ml-2" v-if="previewIcon !== ''">
          <v-icon>{{previewIcon}}</v-icon>
        </div>
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
    Items: {
      value: Array,
      required: true,
      default: []
    },
    noMargin: {
      type: Boolean,
      require: false,
      default: false
    },
    label: {
      type: String,
      require: false,
      default: ''
    },
    previewIcon: {
      type: String,
      require: false,
      default: ''
    },
    itemText: {
      type: String,
      require: false,
      default: 'caption'
    },
    itemValue: {
      type: String,
      require: false,
      default: 'value'
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style scoped>
.previewIcon{
  border: 1px solid #dedede;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
