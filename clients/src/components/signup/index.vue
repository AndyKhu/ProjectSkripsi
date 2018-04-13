<template>
    <div id="app">
        <v-container fluid class="bc">
            <v-layout row justify-center>
                <v-flex lg3 class="login-cont">
                    <v-container fluid class="h-100">
                        <v-layout row wrap class="h-100">
                            <v-flex lg12 class="login-header">
                                <a href="#/signin">
                                    Sign in
                                </a>
                                    or 
                                <span class="text-active">
                                    Sign up
                                </span>
                            </v-flex>
                            <v-flex lg12 id="form">
                                <v-text-field
                                    color="green accent-3"
                                    name="Fullname"
                                    dark
                                    label="Full Name"
                                    placeholder="Enter your Full name"
                                    v-model="fullname"
                                ></v-text-field>
                                <v-text-field
                                    color="green accent-3"
                                    name="Password"
                                    label="Password"
                                    hint="At least 8 characters"
                                    min="8"
                                    dark
                                    placeholder="******"
                                    v-model="password"
                                    :append-icon="password!=''?e1 ? 'visibility' : 'visibility_off' : ''"
                                    :append-icon-cb="() => (e1 = !e1)"
                                    :type="e1 ? 'password' : 'text'"
                                ></v-text-field>
                                <v-text-field
                                    color="green accent-3"
                                    name="Email"
                                    label="Email"
                                    :rules="emailRules"
                                    dark
                                    placeholder="Your Email Goes Here"
                                    v-model="email"
                                ></v-text-field>
                            </v-flex>
                            <v-flex lg12 id="login-footer">
                                <v-btn @click="submit" outline fab dark color="green accent-3">
                                    <v-icon dark>keyboard_arrow_right</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import '../../assets/login.css'
import auth from '../../router/auth'
export default {
  data: () => ({
    fullname: '',
    email: '',
    password: '',
    /* eslint-disable */
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    /* eslint-enable */
    e1: true
  }),
  methods: {
    submit () {
      var credentials = {
        fullname: this.fullname.toLowerCase(),
        password: this.password,
        username: this.email
      }
      auth.signup(this, credentials, '/')
    }
  }
}
</script>
