<template>
  <v-container fluid grid-list-lg v-if="loaded">
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
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-text-field
                      mask= "#############"
                      v-model="data.Phone"
                      label="Phone Number"
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
                          type="number"
                          prefix="Rp."/>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-text-field
                      v-model="data.Website"
                      label="Website"
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
                      :error-messages="typeErrors"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <label style="font-size:12px; color: rgba(0,0,0,.54)">Time Of Operation</label>
                    <v-layout row wrap>
                      <v-flex xs5 class="pt-0">
                        <DateTimePicker timeOnly format="HH:mm" v-model="data.OpenTime" :label="null" :tclass="'pa-0'"/>
                      </v-flex>
                      <v-flex xs2 class="text-xs-center">
                        -
                      </v-flex>
                      <v-flex xs5 class="pt-0">
                        <DateTimePicker timeOnly format="HH:mm" v-model="data.CloseTime" :label="null" :tclass="'pa-0'"/>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 lg6>
                    <v-text-field
                      v-model="data.Address"
                      label="Address"
                      placeholder=" ">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="data.Description"
                      textarea multi-line rows="3"
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
      <v-speed-dial
        v-model="fab"
        fixed bottom right direction="top" :open-on-hover="false" transition="slide-y-reverse-transition">
        <v-btn slot="activator"
          v-model="fab" color="blue darken-2" small dark fab hover>
          <v-icon class="d-flex">more_vert</v-icon>
          <v-icon class="d-flex">close</v-icon>
        </v-btn>
        <v-btn @click="save" fab small dark color="green"><v-icon class="d-flex">save</v-icon></v-btn>
        <router-link :to="{name: 'RestoFac'}"><v-btn fab small dark color="indigo"><v-icon class="d-flex">chevron_right</v-icon></v-btn></router-link>
      </v-speed-dial>
    </v-layout>
  </v-container>
  <div v-else>Loading</div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import auth from '@/api/auth.js'

export default {
  mixins: [validationMixin],
  name: 'Resto-Info',
  components: {
  },
  data: () => ({
    loaded: false,
    fab: false,
    User: null,
    Day: [
      { caption: 'Monday', value: 1 },
      { caption: 'Tuesday', value: 2 },
      { caption: 'Wednesday', value: 3 },
      { caption: 'Thursday', value: 4 },
      { caption: 'Friday', value: 5 },
      { caption: 'Saturday', value: 6 },
      { caption: 'Sunday', value: 7 }],
    data: {
      Name: '',
      Phone: null,
      Description: null,
      PriceFrom: null,
      PriceEnd: null,
      Website: null,
      OpenTime: null,
      CloseTime: null,
      OpenDay: null,
      CloseDay: null,
      Address: null,
      Type: '',
      Id_User: null
    },
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
    save () {
      if (this.validate()) {
        this.data.Id = this.User.userResto == null ? '' : this.User.userResto.Id
        this.data.Id_User = this.User.Id
        axios.post(`${this.$store.getters.ROOT_URL}/api/save/resto`, this.data)
          .then(res => {
            this.$store.dispatch('setDialogMsg', {
              txtmsg: 'Save Success',
              status: true,
              color: 'success'
            })
          }).catch((res) => {
            this.$store.dispatch('setDialogMsg', {
              txtmsg: 'Save Failed',
              status: true,
              color: 'error'
            })
          })
      } else {
        this.$v.$touch()
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Save Failed',
          status: true,
          color: 'error'
        })
      }
    },
    validate () {
      if (this.data.Name === null || this.data.Name === '') {
        return false
      } else if (this.data.Type === null || this.data.Type === '') {
        return false
      } else if (this.data.OpenDay > this.data.CloseDay) {
        return false
      }
      return true
    }
  },
  mounted () {
    if (this.$store.getters['getUser'] === null) {
      auth.getUser(this).then(() => {
        this.User = this.$store.getters['getUser']
        if (this.User.userResto != null) {
          this.data = this.User.userResto
        }
        this.loaded = true
      })
    } else {
      this.User = this.$store.getters['getUser']
      if (this.User.userResto != null) {
        this.data = this.User.userResto
      }
      this.loaded = true
    }
  }
}
</script>
<style scoped>
form{
  font-family: arial;
}
.item-tittle{
  border-bottom: 1px solid #E0E0E0;
  font-size: 18px;
  color: #616161;
  font-family: arial;
}
.item-content{
  font-family: serif;
}
.card-content{
  min-height: 550px;
}
</style>
