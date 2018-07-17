<template>
  <v-flex xs12 class="pa-4" v-if="getUser!=null">
    <v-layout row wrap justify-center align-items-center>
      <v-flex xs12 md4 lg4>
        <v-card>
          <v-flex xs12 class="item-tittle pa-2 force-center">
            <v-icon style="font-size:18px" dark class="mx-2">lock</v-icon>
            <span>Change Password</span>
          </v-flex>
          <v-flex xs12 class="pa-4" style="padding-bottom: 0 !important;">
            <v-layout row wrap>
              <v-flex xs12>
                <formTextField type="password" v-model="data.pass" :label="'Current Password'"/>
                <formTextField type="password" v-model="data.newpass" :label="'New Password'"/>
                <formTextField type="password" v-model="data.confirmpass" :label="'Confirm Password'"/>
              </v-flex>
              <v-flex xs12 text-xs-center class="mb-4 mt-2">
                <v-btn @click="changePass" color="primary">Change</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
  <v-flex xs12 v-else>
    lol
  </v-flex>
</template>
<script>
import Member from '@/api/member.js'
export default {
  data () {
    return {
      data: {
        pass: null,
        newpass: null,
        confirmpass: null
      }
    }
  },
  methods: {
    changePass () {
      this.data.Id = this.getUser.Id
      if (this.data.newpass === this.data.confirmpass) {
        Member.changePass(this, this.data).then(res => {
          // console.log(res)
          if (res.data.status) {
            this.$store.dispatch('setDialogMsg', {
              txtmsg: 'Success Change Password',
              status: true,
              color: 'success'
            })
            this.data = {
              pass: null,
              newpass: null,
              confirmpass: null
            }
          } else {
            this.$store.dispatch('setDialogMsg', {
              txtmsg: res.data.message,
              status: true,
              color: 'error'
            })
          }
        })
      } else {
        this.$store.dispatch('setDialogMsg', {
          txtmsg: 'New Password & Confirm Password not Match',
          status: true,
          color: 'error'
        })
      }
    }
  },
  computed: {
    getUser () {
      return this.$store.getters.getUser
    }
  }
  // watch: {
  //   getUser (newValue, oldValue) {
  //     if (newValue !== null) {
  //       this.data = newValue
  //     }
  //   }
  // }
}
</script>
<style scoped>
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  font-family: arial;
}
.sub-tittle{
  font-size: 16px;
  font-weight: bold;
  color: #616161;
}
</style>
