<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class="card-content">
          <v-flex xs12 class="pa-2 px-3 item-tittle">
            Restaurant Information
          </v-flex>
          <v-flex xs12 class="pa-2 px-3 item-content">
            <v-form>
              <v-container grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs12 lg6>
                    <v-text-field
                      v-model="data.Name"
                      label="Restaurant Name"
                      :error-messages="nameErrors"
                      required
                      @input="input"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-text-field
                      mask= "#############"
                      v-model="data.Phone"
                      label="Phone Number"
                      @input="input"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <label style="font-size:12px; color: rgba(0,0,0,.54)">Price Range</label>
                    <v-layout row wrap>
                      <v-flex xs5 class="pt-0">
                        <number-text-field
                          v-model="data.PriceFrom"
                          :error-messages="PriceErrors"
                          @input="input"
                          class="pa-0"
                          type="number"
                          prefix="Rp."/>
                      </v-flex>
                      <v-flex xs2 class="text-xs-center">
                        -
                      </v-flex>
                      <v-flex xs5 class="pt-0">
                        <number-text-field
                          v-model="data.PriceEnd"
                          :error-messages="PriceErrors"
                          class="pa-0"
                          @input="input"
                          type="number"
                          prefix="Rp."/>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-text-field
                      v-model="data.Website"
                      label="Website"
                      @input="input"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <label style="font-size:12px; color: rgba(0,0,0,.54)">Day Of Operation</label>
                    <v-layout row wrap>
                      <v-flex xs5 class="pt-0">
                        <v-select
                          :items="Day"
                          v-model="data.OpenDay"
                          single-line
                          max-height="200"
                          class="pa-0"
                          @input="input"
                          item-text="caption"
                          item-value="value"
                          autocomplete
                          :error-messages="DayOfOperationErrors"
                        ></v-select>
                      </v-flex>
                      <v-flex xs2 class="text-xs-center">
                        -
                      </v-flex>
                      <v-flex xs5 class="pt-0">
                        <v-select
                          :items="Day"
                          v-model="data.CloseDay"
                          max-height="200"
                          single-line
                          class="pa-0"
                          @input="input"
                          item-text="caption"
                          item-value="value"
                          autocomplete
                          :error-messages="DayOfOperationErrors"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-text-field
                      v-model="data.Type"
                      label="Dinning Style"
                      @input="input"
                      :error-messages="typeErrors"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <label style="font-size:12px; color: rgba(0,0,0,.54)">Time Of Operation</label>
                    <v-layout row wrap>
                      <v-flex xs5 class="pt-0">
                        <DateTimePicker @input="input" timeOnly format="HH:mm" v-model="data.OpenTime" :label="null" :tclass="'pa-0'"/>
                      </v-flex>
                      <v-flex xs2 class="text-xs-center">
                        -
                      </v-flex>
                      <v-flex xs5 class="pt-0">
                        <DateTimePicker @input="input" timeOnly format="HH:mm" v-model="data.CloseTime" :label="null" :tclass="'pa-0'"/>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-text-field
                      v-model="data.Address"
                      label="Address"
                      @input="input"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="data.Description"
                      textarea multi-line rows="3"
                      @input="input"
                      label="Restaurant Description"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    value: {
      type: Object,
      required: false
    }
  },
  mixins: [validationMixin],
  name: 'Resto-Info',
  data: () => ({
    data: {},
    fab: false,
    Day: [
      { caption: 'Monday', value: 1 },
      { caption: 'Tuesday', value: 2 },
      { caption: 'Wednesday', value: 3 },
      { caption: 'Thursday', value: 4 },
      { caption: 'Friday', value: 5 },
      { caption: 'Saturday', value: 6 },
      { caption: 'Sunday', value: 7 }],
    edited: false
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.data.Name.$dirty) return errors
      !this.$v.data.Name.required && errors.push('Name is required.')
      return errors
    },
    typeErrors () {
      const errors = []
      if (!this.$v.data.Type.$dirty) return errors
      !this.$v.data.Type.required && errors.push('Type is required.')
      return errors
    },
    DayOfOperationErrors () {
      const errors = []
      !this.$v.data.OpenDay.higher && errors.push("Open Day can't higher than Close Day")
      if (!this.$v.data.OpenDay.$dirty || !this.$v.data.CloseDay.$dirty) return errors
      return errors
    },
    PriceErrors () {
      const errors = []
      !this.$v.data.Price.higher && errors.push("Price From can't higher than Price End")
      if (!this.$v.data.Price.$dirty || !this.$v.data.Price.$dirty) return errors
      return errors
    }
  },
  validations: {
    data: {
      Name: {
        required
      },
      Type: {
        required
      },
      OpenDay: {
        higher () {
          if (this.data.OpenDay > this.data.CloseDay) return false
          return true
        }
      },
      Price: {
        higher () {
          if (this.data.PriceFrom > this.data.PriceEnd) return false
          return true
        }
      }
    }
  },
  methods: {
    input (value) {
      this.$emit('input', this.data)
    }
  },
  mounted () {
    this.data = this.value
  }
}
</script>
