<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                  <v-toolbar-title>Email Verification Required</v-toolbar-title>
              </v-toolbar>
              <div class="pa-3">
                <v-card-text>
                  You're almost there! we've sent a verification email to the address you provided.
                  Clicking the confirmation link in that email let us know the email address is both valid and yours.
                  <!-- It is also you final step in the sign up process. -->
                </v-card-text>
                <div class="force-center">
                  <router-link to="/">
                    <v-btn type="submit" color="primary" >Back To Home</v-btn>
                  </router-link>
                </div>
              </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
