<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md4>
          <v-form @submit.prevent="submit">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <div class="pa-3">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      @keyup="loginEnter"
                      prepend-icon="email"
                      v-model="email"
                      :rules="emailRules"
                      required
                      name="email"
                      label="Email"
                      type="text">
                    </v-text-field>
                    <v-text-field
                      @keyup="loginEnter"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      :rules="passwordRules"
                      required
                      type="password">
                    </v-text-field>
                    <span style="color:#757575">Not Registered ? <router-link to="signup">Create an Account</router-link></span>
                    <v-alert :type="getMessage().type || 'info'" :value="getMessage() !== null"
                         dismissible @input="closeMessage" v-if="getMessage() !== null ">{{getMessage().message}}</v-alert>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary">Login</v-btn>
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
  name: 'login-page',
  data () {
    return {
      email: '',
      emailRules: [
        (v) => !!v || 'Username required'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password required'
      ]
    }
  },
  methods: {
    submit () {
      var credentials = {
        email: this.email,
        password: this.password
      }
      auth.login(this, credentials, '/')
    },
    loginEnter (event) {
      if (event.keyCode === 13) {
        this.submit()
      }
    },
    getMessage () {
      return this.$store.getters.errorMsg
    },
    closeMessage () {
      this.$store.dispatch('closeErrorMsg')
    }
  }
}
</script>
