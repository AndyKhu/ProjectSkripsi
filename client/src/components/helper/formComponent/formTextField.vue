<template>
  <div class="component-cont mb-3">
    <label class="mb-2">{{label}}</label>
    <v-text-field class="pa-0 px-3"
      v-bind="$attrs"
      v-model="comData"
      hide-details
      placeholder=" ">
    </v-text-field>
  </div>
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
