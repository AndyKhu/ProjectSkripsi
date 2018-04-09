<template>
      <v-layout row justify-center class="item-normal-margin">
        <v-flex lg4>
            <v-card light tile class="margin-35px pointer-normal">
                <v-flex lg12 text-xs-center class="title">
                    Change Password
                </v-flex>
                <v-flex lg12 class="pad-40px">
                     <v-text-field 
                            label="Current Password" 
                            placeholder=" "
                            light>
                            </v-text-field>
                            <v-text-field 
                            label="New Password"
                            placeholder=" "
                            light>
                            </v-text-field>
                            <v-text-field 
                            label="Confirm Password" 
                            placeholder=" "
                            light>
                            </v-text-field>
                    <v-flex lg12 class="fc" text-xs-center>
                        <v-btn>
                            Change
                        </v-btn>
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
