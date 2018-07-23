<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md4>
          <v-form @submit.prevent="submit">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                  <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <div class="pa-3">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      @keyup="submitEnter"
                      prepend-icon="email"
                      v-model="email"
                      :rules="emailRules"
                      required
                      name="email"
                      label="Email"
                      type="text">
                    </v-text-field>
                    <v-text-field
                      @keyup="submitEnter"
                      prepend-icon="person"
                      name="fullName"
                      label="Full Name"
                      v-model="fullName"
                      :rules="fullNameRules"
                      required/>
                    <v-text-field
                      @keyup="submitEnter"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      :rules="passwordRules"
                      required
                      type="password"/>
                    <v-select
                      prepend-icon="business_center"
                      :items="type"
                      v-model="usertype"
                      single-line />
                    <v-text-field v-if="usertype !== 'Member'"
                      prepend-icon="restaurant_menu"
                      name="Resto Name"
                      label="Resto Name"
                      v-model="restoname"/>
                    <!-- <v-text-field
                      prepend-icon="description"
                      name="Business Permit"
                      label="Business Permit"
                      v-model="restoname"/> -->
                    <v-layout row wrap class="pb-3" v-if="usertype !== 'Member'">
                      <v-flex xs9 class="force-center-left txt-cst">
                        Business Permit
                      </v-flex>
                      <v-flex xs3>
                        <input @change="ImgChange" type="file" id="target" style="display: none" accept="image/*"/>
                        <v-btn block dark color="green" @click="click">
                          <v-icon dark>cloud_upload</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <span style="color:#757575">Already Have Account ? <router-link :to="{name: 'Login'}">Login Here</router-link></span>
                    <v-alert :type="getMessage().type || 'info'" :value="getMessage() !== null"
                         dismissible @input="closeMessage" v-if="getMessage() !== null ">{{getMessage().message}}</v-alert>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary">Create</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import auth from '@/api/auth'
export default {
  name: 'Signup-page',
  data () {
    return {
      email: '',
      emailRules: [
        (v) => !!v || 'Username required'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password required'
      ],
      fullName: '',
      fullNameRules: [
        (v) => !!v || 'Password required'
      ],
      usertype: 'Member',
      type: ['Member', 'Admin Resto'],
      restoname: '',
      Img: null
    }
  },
  methods: {
    submit () {
      var credentials = {
        Id: '',
        email: this.email,
        password: this.password,
        fullName: this.fullName,
        restoName: this.restoname
      }
      if (this.validate()) {
        if (this.usertype === 'Member') {
          auth.signUp(this, credentials, '/')
        } else {
          credentials.Img = this.Img
          auth.signupA(this, credentials, '/')
        }
      }
    },
    validate () {
      if (!this.validateEmail(this.email)) {
        console.log('ltea')
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Email is Invalid',
          status: true,
          color: 'error'
        })
        return false
      } else if (this.fullName === '') {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: `Name Can't be Empty`,
          status: true,
          color: 'error'
        })
        return false
      } else if (this.password.length < 8) {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'password must be at least 8',
          status: true,
          color: 'error'
        })
        return false
      }
      if (this.usertype === 'Admin Resto') {
        if (this.restoname === '') {
          this.$store.dispatch('setDialogMsg', {
            txtmsg: `Resto Name can't Be Empty`,
            status: true,
            color: 'error'
          })
          return false
        } else if (!this.Img) {
          this.$store.dispatch('setDialogMsg', {
            txtmsg: `Business Permit is Required`,
            status: true,
            color: 'error'
          })
          return false
        }
      }
      return true
    },
    validateEmail (email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    submitEnter (event) {
      if (event.keyCode === 13) {
        this.submit()
      }
    },
    getMessage () {
      return this.$store.getters.errorMsg
    },
    closeMessage () {
      this.$store.dispatch('closeErrorMsg')
    },
    click () {
      document.getElementById('target').click()
    },
    ImgChange (e) {
      let tl = e.target.files.length
      if (tl !== 0) {
        this.Img = e.target.files[0]
      }
    }
  }
}
</script>
<style scoped>
.txt-cst{
  color: #424242;
  font-size: 18px;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
