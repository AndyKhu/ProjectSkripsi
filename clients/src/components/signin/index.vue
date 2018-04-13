<template>
    <div id="app">
        <v-container fluid class="bc">
            <v-layout row justify-center>
                <v-flex xs12 lg3 class="login-cont">
                    <v-form @submit.prevent="submit" class="h-100">
                        <v-container fluid class="h-100">
                            <v-layout row wrap class="h-100">
                                <v-flex xs12 lg12 class="login-header">
                                    <span class="text-active">
                                        Sign in
                                    </span>
                                        or 
                                    <a href="#/signup">
                                        Sign up
                                    </a>
                                </v-flex>
                                <v-flex xs12 lg12 id="form">
                                    <v-text-field
                                        dark
                                        color="green accent-3"
                                        name="Username"
                                        label="Username"
                                        placeholder="Enter your email address"
                                        v-model="username"
                                    ></v-text-field>
                                    <v-text-field
                                        dark
                                        color="green accent-3"
                                        name="Password"
                                        label="Password"
                                        placeholder="******"
                                        v-model="password"
                                        :append-icon="password!=''?e1 ? 'visibility' : 'visibility_off' : ''"
                                        :append-icon-cb="() => (e1 = !e1)"
                                        :type="e1 ? 'password' : 'text'"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex lg12 id="login-footer">
                                    <v-btn type="submit" outline fab dark color="green accent-3">
                                        <v-icon dark>keyboard_arrow_right</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
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
    username: '',
    password: '',
    ex: false,
    e1: true
  }),
  methods: {
    submit () {
      var credentials = {
        username: this.username.toLowerCase(),
        password: this.password
      }
      auth.login(this, credentials, '/')
    }
  }
}
</script>
