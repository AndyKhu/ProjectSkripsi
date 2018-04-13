<template>
<v-container fluid grid-list-xl class="form-cont-detail">
    <v-layout row wrap class="pad-bot-80px">
        <v-flex xs12 lg6>
            <v-text-field
            label="Restaurant Name" light
            v-model="data.rn"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            label="Phone Number" light
            v-model="data.pn"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            label="Restaurant Description" light
            v-model="data.rd"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            label="Other Phone Number" light
            v-model="data.opn"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-layout row>
                <v-flex lg5>
                    <v-text-field
                    label="Price Range" light
                    v-model="data.prf"
                    type="number"
                    placeholder=" "
                    ></v-text-field>
                </v-flex>
                <v-flex lg1 text-xs-center>
                    <span class="lineh-55px">-</span>
                </v-flex>
                <v-flex lg5>
                    <v-text-field light
                    v-model="data.pre"
                    type="number"
                    placeholder=" "
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            label="website" light
            v-model="data.web"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-layout row>
                <v-flex lg5>
                    <v-select
                        :items="days"
                        label="Days Operation" light
                        v-model="data.dof"
                        autocomplete
                        placeholder=" "
                    ></v-select>
                </v-flex>
                <v-flex lg1 text-xs-center>
                    <span class="lineh-55px">-</span>
                </v-flex>
                <v-flex lg5>
                    <v-select
                        :items="days"
                        v-model="data.doe"
                        light
                        autocomplete
                        placeholder=" "
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 lg6>
            <v-layout row>
                <v-flex lg5>
                    <v-text-field
                    label="Time Operation" light
                    mask="##:##"
                    v-model="data.tof"
                    placeholder=" "
                    ></v-text-field>
                </v-flex>
                <v-flex lg1 text-xs-center>
                    <span class="lineh-55px">-</span>
                </v-flex>
                <v-flex lg5>
                    <v-text-field light
                    mask="##:##"
                    v-model="data.toe"
                    placeholder=" "
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            label="Dinning Style" light
            v-model="data.ds"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs12 lg6>
            <v-text-field
            label="Address" light
            v-model="data.add"
            placeholder=" "
            ></v-text-field>
        </v-flex>
        <v-flex xs6 lg6>
            <span class="form-cb-font"> Reservation Type </span> 
            <v-checkbox class="cst-cb" light hide-details label="Weeding" v-model="data.rt" value="WEEDING"></v-checkbox>
            <v-checkbox class="cst-cb" light hide-details label="Birthday" v-model="data.rt" value="BIRTHDAY"></v-checkbox>
            <v-checkbox class="cst-cb" light hide-details label="Normal" v-model="data.rt" value="NORMAL"></v-checkbox>
        </v-flex>
        <v-flex xs6 lg6>
            <span class="form-cb-font"> Table For </span> 
            <v-checkbox class="cst-cb" light hide-details label="1 - 2 People" v-model="data.tf" value="1"></v-checkbox>
            <v-checkbox class="cst-cb" light hide-details label="2 - 4 People" v-model="data.tf" value="2"></v-checkbox>
            <v-checkbox class="cst-cb" light hide-details label="4 - 8 People" v-model="data.tf" value="3"></v-checkbox>
            <v-checkbox class="cst-cb" light hide-details label="8 - 12 People" v-model="data.tf" value="4"></v-checkbox>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
export default {
  data: () => ({
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    data: {
      rn: '',
      pn: '',
      rd: '',
      opn: '',
      prf: '',
      pre: '',
      web: '',
      dof: '',
      doe: '',
      tof: '',
      toe: '',
      ds: '',
      add: '',
      rt: [],
      tf: []
    }
  })
//   methods: {
//     signOut () {
//       auth.logout(this)
//     }
//   },
//   mounted () {
//     this.role = auth.user.role
//     this.username = auth.user.username
//   }
}
</script>