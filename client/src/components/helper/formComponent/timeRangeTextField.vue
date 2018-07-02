<template>
  <div class="component-cont mb-3">
    <label class="mb-2">{{label}}</label>
    <div class="component-item">
      <timePicker v-model="valueC" @input="input"/>
      <span> - </span>
      <timePicker v-model="TEC" @input="input2"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String / Number,
      required: false,
      default: Date.now()
    },
    TE: {
      type: String / Number,
      required: false,
      default: Date.now()
    },
    label: {
      type: String,
      require: false,
      default: ''
    }
  },
  data () {
    return {
      tmpValue: this.value,
      tmpTE: this.TE
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    input2 (value) {
      this.$emit('TE', value)
    }
  },
  computed: {
    valueC: {
      get () {
        return this.tmpValue
      },
      set (value) {
        this.tmpValue = value
      }
    },
    TEC: {
      get () {
        return this.tmpTE
      },
      set (value) {
        this.tmpTE = value
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
.component-item{
  display:flex;
  align-items: center;
  flex-direction: row;
}
</style>
