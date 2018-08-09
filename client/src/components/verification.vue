<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                  <v-toolbar-title>Verification</v-toolbar-title>
              </v-toolbar>
              <div class="pa-3">
                <v-card-text style="color:#616161">
                  {{message}}
                </v-card-text>
                <div class="force-center">
                  <router-link :to="tolink">
                    <v-btn type="submit" color="primary" >{{btnC}}</v-btn>
                  </router-link>
                </div>
              </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import auth from '@/api/auth'
export default {
  data () {
    return {
      load: false,
      message: '',
      btnC: '',
      tolink: '/'
    }
  },
  mounted () {
    auth.verification(this,this.$route.params.id,this.$route.params.user).then(cb => {
      if (this.$route.params.id == '1') {
        this.message = 'Your email address has been successfully verified, now you can use your email to login.'
        this.btnC = 'Login'
        this.tolink = '/login'
      } else {
        this.message = 'Your request has been sent, the admin will verify your restaurant information and will contact you via email, the process will take about 3 x 24 hours'
        this.btnC = 'Back To Home'
        this.load = true
      }
      this.load = true
    }).catch(err => {
      this.tolink = '/'
      this.message = 'Verification failed call admin for more information'
      this.btnC = 'Back To Home'
      this.load = true
    })
  }
}
</script>
