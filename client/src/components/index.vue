<template>
  <div class="bc-cst">
        <v-container fluid>
            <v-layout row>
                <v-flex lg8>
                    <v-layout row justify-center>
                        <v-flex lg4 class="tx-center content-img">
                            <img src="/static/Resto/logo.png"/>
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center class="btn-cont"> 
                        <v-flex lg8 class="tx-center">
                            <v-btn href="#/signin" outline class="btn-cst">Login</v-btn>
                            <v-btn href="#/signin" outline class="btn-cst">Take a Look</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
  </div>
</template>
<script>
    import '../assets/index.css'
    export default {
    }
</script>
