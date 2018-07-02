<template>
  <v-layout row wrap>
    <v-flex xs6 class="pb-0">
    <formTextField v-model="value.Name" disabled :label="'Restaurant Name'" @input="input"/>
    <formPR v-model="value.PriceFrom" :PE="value.PriceEnd" @PE="PEC" :label="'Price Range'" @input="input"/>
    <formDR v-model="value.OpenDay" :DE="value.CloseDay" @DE="DEC" :label="'Day Operation'" @input="input"/>
    <formTR v-model="value.OpenTime" :TE="value.CloseTime" @TE="TEC" :label="'Time Operation'"  @input="input"/>
    <!-- <timePicker v-model="value.OpenTime"/> -->
    <formNumberField v-model="value.ReservePrice" :label="'Reservation Price'"/>
    </v-flex>
    <v-flex xs6 class="pb-0">
    <formTextField mask= "#### #### ####" v-model="value.Phone" :label="'Phone Number'" @input="input"/>
    <formTextField v-model="value.Website" :label="'Website'" @input="input"/>
    <formComboBox v-model="value.Type" :label="'Dinning Style'" :Items="dinningItems"/>
    <formTextField v-model="value.Address" :label="'Address'" @input="input"/>
    </v-flex>
    <v-flex xs12 class="pt-0">
      <formTextField rows="4" multi-line v-model="value.Description" :label="'Restaurant Description'" @input="input"/>
    </v-flex>
  </v-layout>
</template>
<script>
export default{
  props: {
    value: {
      value: Object,
      required: true,
      default: {}
    }
  },
  data: () => ({
    dinningItems: ['Casual Dinning', 'Family Style', 'Fine Dinning']
  }),
  methods: {
    PEC (value) {
      this.value.PriceEnd = value
      this.$emit('input', this.value)
    },
    DEC (value) {
      this.value.CloseDay = value
      this.$emit('input', this.value)
    },
    TEC (value) {
      this.value.CloseTime = value
      this.$emit('input', this.value)
    },
    input (value) {
      this.$emit('input', this.value)
    }
  }
}
</script>
