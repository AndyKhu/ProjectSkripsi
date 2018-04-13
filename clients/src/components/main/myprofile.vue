<template>
      <v-layout row justify-center class="item-normal-margin">
        <v-flex lg4>
            <v-card light tile class="margin-35px pointer-normal">
                <v-flex lg12 text-xs-center class="title">
                    Profile Setting
                </v-flex>
                <v-flex lg12 class="pad-10px">
                    <v-layout row>
                        <v-flex lg6 class="autom">
                            <v-avatar
                            size="150px"
                            class="grey lighten-4"
                            >
                                <img src="/static/Resto/01.jpg" alt="avatar">
                            </v-avatar>
                        </v-flex>
                        <v-flex lg6>
                            <v-text-field 
                            label="Nama" 
                            placeholder=" "
                            light>
                            </v-text-field>
                            <v-text-field 
                            label="Email"
                            placeholder=" "
                            light>
                            </v-text-field>
                            <v-text-field 
                            label="Phone" 
                            placeholder=" "
                            light>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row text-xs-center>
                        <v-flex lg4 class="fc">
                            Age
                            <p>-</p>
                        </v-flex>
                        <v-flex lg4 class="fc">
                            Weight
                            <p>-</p>
                        </v-flex>
                        <v-flex lg4 class="fc">
                            Height
                            <p>-</p>
                        </v-flex>
                    </v-layout>
                    <v-flex lg12 class="fc margin-btn-10px" text-xs-center>
                        <p>Emergency Contact</p>
                        <v-layout row justify-center>
                            <v-flex lg4 class="border-1px">
                                -
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex lg12 class="fc footer-profile" text-xs-center>
                        <router-link to="/main/chpass">
                            <v-btn flat light color="grey darken-2">
                                Change Password
                            </v-btn>
                        </router-link>
                    </v-flex>
                </v-flex>
            </v-card>
        </v-flex>
      </v-layout>
</template>
<script>
import '../../assets/profile.css'
export default {
//   data: () => ({
//   }),
//   methods: {
//   }
}
</script>
