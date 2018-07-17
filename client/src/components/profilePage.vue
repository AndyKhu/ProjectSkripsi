<template>
  <v-app v-if="getUser!==null">
    <v-flex xs12 class="pa-4">
      <v-layout row wrap justify-center align-items-center>
        <v-flex xs12 md4 lg4>
          <v-card>
            <v-flex xs12 class="item-tittle text-xs-center pa-2">
              Profile Setting
            </v-flex>
            <v-flex xs12 class="pa-4" style="padding-bottom: 0 !important;">
              <span class="sub-tittle">Personal Details</span>
              <v-layout row wrap>
                <v-flex xs5 class="pa-2 force-center">
                  <v-avatar @click="click"
                    style="cursor:pointer"
                    :size="150"
                    color="red lighten-4">
                    <img :src="showPic" alt="avatar">
                  </v-avatar>
                  <input @change="fileChange" type="file" id="target" style="display: none" accept="image/*"/>
                </v-flex>
                <v-flex xs7 class="pa-2">
                  <v-text-field
                    v-model="data.fullName"
                    placeholder=" "
                    label="Name">
                  </v-text-field>
                  <v-text-field
                    disabled
                    v-model="data.Email"
                    placeholder=" "
                    label="Email">
                  </v-text-field>
                  <v-text-field
                    mask="#### #### ####"
                    v-model="data.Phone"
                    placeholder=" "
                    label="Phone">
                  </v-text-field>
                  <!-- <formTextField brbtm v-model="data.fullName" :label="'Name'"/> -->
                  <!-- <formTextField disabled brbtm v-model="data.Email" :label="'Email'"/>
                  <formTextField brbtm v-model="data.Phone" :label="'Phone'"/> -->
                </v-flex>
                <v-flex xs4>
                  <formTextField labelC brbtm v-model="data.Age" :label="'Age'"/>
                </v-flex>
                <v-flex xs4>
                  <formTextField labelC brbtm v-model="data.Weight" :label="'Weight'"/>
                </v-flex>
                <v-flex xs4>
                  <formTextField labelC brbtm v-model="data.Height" :label="'Height'"/>
                </v-flex>
                <v-flex text-xs-center xs12>
                  <v-btn @click="update" color="success">Update Account</v-btn>
                </v-flex>
                <v-flex xs12 text-xs-center class="mb-4 mt-2">
                  <v-btn @click="close" color="error">Close Account</v-btn>
                </v-flex>
                <v-flex xs12 style="border-top: 1px solid #dedede;">
                  <v-btn large depressed block color="white" @click="changepassword">
                    <v-icon>lock</v-icon>
                    Change password
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-app>
  <v-app v-else>
    lol
  </v-app>
</template>
<script>
// import Vuex from 'vuex'
import Member from '@/api/member.js'

export default {
  data () {
    return {
      data: {
        fullName: null,
        Email: null,
        Phone: null,
        Age: null,
        Weight: null,
        Height: null
      },
      dp: null,
      dppic: null
    }
  },
  methods: {
    click () {
      document.getElementById('target').click()
    },
    fileChange (e) {
      let formdata = new FormData()
      let tl = e.target.files.length
      if (tl !== 0) {
        formdata.append('img', e.target.files[0])
        this.dp = formdata
        this.dppic = e.target.files[0]
      }
    },
    changepassword () {
      if (this.getuser().Type === 'AdminResto') {
        this.$router.push({name: 'ChangePasswordAR'})
      } else {
        this.$router.push({name: 'ChangePassword'})
      }
    },
    getuser () {
      return this.$store.getters['getUser']
    },
    update () {
      Member.updateProfile(this, this.data, this.dp).then(res => {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'Update Success',
          status: true,
          color: 'success'
        })
      })
    },
    close () {
      console.log(this.data)
    }
  },
  mounted () {
    // this.data = this.getUser
    // console.log(this.data)
    /* if (this.data.DpId !== null) {
      Member.getProfilePicture(this, this.data).then(res => {
        this.dppic = res.data.file
      })
    } */
  },
  computed: {
    getUser () {
      return this.$store.getters.getUser
    },
    showPic: {
      get () {
        if (this.dppic !== null) {
          if (this.dppic instanceof File) {
            return URL.createObjectURL(this.dppic)
          } else {
            let x = new Blob([new Uint8Array(this.dppic.data)])
            return URL.createObjectURL(x)
          }
        } else {
          return 'http://via.placeholder.com/200x200'
        }
      }
    }
  },
  watch: {
    getUser (newValue, oldValue) {
      if (newValue !== null) {
        this.data = newValue
        if (this.data.DpId !== null) {
          Member.getProfilePicture(this, this.data).then(res => {
            this.dppic = res.data.file
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
.sub-tittle{
  font-size: 16px;
  font-weight: bold;
  color: #616161;
}
</style>
