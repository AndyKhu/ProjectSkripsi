<template>
  <v-layout row wrap>
      <v-flex xs2>
      <restoTab v-model="items" @changeclass="changeclass"/>
      </v-flex>
      <v-flex xs10>
        <div v-if="!loaded"> Loading </div>
        <Information ref="info" v-else-if="inactive === 'Restaurant Information'" v-model="User.userResto"/>
        <Facilities ref="fac" v-else-if="inactive === 'Restaurant Facilities'" v-model="User.userResto.Tb_Resto_Facs" />
        <Gallery ref="gal" v-else-if="inactive === 'Restaurant Gallery'" v-model="User.userResto.Tb_Galleries" :deleted="DeletedF" @DeletedInput="DeletedInput" />
        <MenuR ref="menu" v-else-if="inactive === 'Restaurant Menu'" v-model="User.userResto" />
      </v-flex>
      <v-btn v-if="inactive !== 'Restaurant Menu'" fixed @click="save" fab small bottom right dark color="green"><v-icon class="d-flex">save</v-icon></v-btn>
  </v-layout>
</template>
<script>
import restoTab from '@/components/MyResto/restoinfo/restotab.vue'
import Information from '@/components/MyResto/restoinfo/information.vue'
import Facilities from '@/components/MyResto/restoinfo/facilities.vue'
import Gallery from '@/components/MyResto/restoinfo/gallery.vue'
import MenuR from '@/components/MyResto/restoinfo/menu.vue'
import auth from '@/api/auth.js'
import api from '@/api/helper.js'
// import axios from 'axios'

export default {
  components: {
    restoTab,
    Information,
    Facilities,
    Gallery,
    MenuR
  },
  data: () => ({
    User: {},
    DeletedF: [],
    loaded: false,
    inactive: 'Restaurant Information',
    items: [
      {
        Icon: 'info',
        Tittle: 'Restaurant Information',
        active: true
      },
      {
        Icon: 'stars',
        Tittle: 'Restaurant Facilities',
        active: false
      },
      {
        Icon: 'watch_later',
        Tittle: 'Restaurant Duration',
        active: false
      },
      {
        Icon: 'image',
        Tittle: 'Restaurant Gallery',
        active: false
      },
      {
        Icon: 'book',
        Tittle: 'Restaurant Menu',
        active: false
      }
    ]
  }),
  methods: {
    changeclass (item) {
      const currentactive = this.items.map(e => e.active).indexOf(true)
      for (let a in this.items) {
        if (this.items[a].Tittle === item) {
          if (item === 'Restaurant Menu' && this.User.userResto.Id === null) {
            this.$store.dispatch('setDialogMsg', {
              txtmsg: 'Must Save Information Before Add Menu',
              status: true,
              color: 'error'
            })
            this.items[currentactive].active = true
            break
          } else {
            this.inactive = item
            this.items[a].active = true
          }
        } else {
          this.items[a].active = false
        }
      }
    },
    save () {
      if (this.validate()) {
        if (this.User.userResto.Id !== null && this.User.userResto.Id !== '') {
          api.updateResto(this, this.User.userResto).then(a => {
            api.uploadFile(this, this.User.userResto, this.DeletedF)
          })
        } else {
          api.saveResto(this, this.User.userResto).then(a => {
            api.uploadFile(this, this.User.userResto, this.DeletedF)
          })
        }
      } else {
        this.setError()
      }
    },
    validate () {
      if (this.User.userResto.Name === null || this.User.userResto.Name === '') {
        this.$refs.info.$v.data.Name.$touch()
        return false
      } else if (this.User.userResto.Type === null || this.User.userResto.Type === '') {
        this.$refs.info.$v.data.Type.$touch()
        return false
      } else if (this.User.userResto.OpenDay > this.User.userResto.CloseDay) {
        this.$refs.info.$v.data.OpenDay.$touch()
        return false
      } else if (this.User.userResto.PriceFrom > this.User.userResto.PriceEnd) {
        this.$refs.info.$v.data.Price.$touch()
        return false
      }
      return true
    },
    defaultset () {
      return {
        Id: null,
        Name: '',
        Phone: null,
        Description: null,
        PriceFrom: null,
        PriceEnd: null,
        Website: null,
        OpenTime: null,
        CloseTime: null,
        OpenDay: null,
        CloseDay: null,
        Address: null,
        Type: '',
        Id_User: this.User.Id,
        Tb_Resto_Facs: [],
        Tb_Galleries: [],
        Tb_Resto_Menus: []
      }
    },
    setSuccess () {
      this.$store.dispatch('setDialogMsg', {
        txtmsg: 'Save Success',
        status: true,
        color: 'success'
      })
    },
    setError () {
      this.$store.dispatch('setDialogMsg', {
        txtmsg: 'Save Failed',
        status: true,
        color: 'error'
      })
    },
    DeletedInput (data) {
    },
    initialF () {
      if (this.$store.getters['getUser'] === null) {
        auth.getUser(this).then(() => {
          this.User = this.$store.getters['getUser']
          if (this.User.userResto === null) {
            this.User.userResto = this.defaultset()
          }
          if (this.User.userResto.Tb_Resto_Facs === null) {
            this.User.userResto.Tb_Resto_Facs = []
          }
          if (this.User.userResto.Tb_Galleries === null) {
            this.User.userResto.Tb_Galleries = []
            this.loaded = true
          } else {
            api.getImage(this, this.User.userResto)
          }
          if (this.User.userResto.Tb_Resto_Menus === null) {
            this.loaded = true
            this.User.userResto.Tb_Resto_Menus = []
          } else {
            this.loaded = false
            api.getImageMenu(this, this.User.userResto)
          }
        })
      } else {
        this.User = this.$store.getters['getUser']
        if (this.User.userResto === null) {
          this.User.userResto = this.defaultset()
        }
        if (this.User.userResto.Tb_Resto_Facs === null) {
          this.User.userResto.Tb_Resto_Facs = []
        }
        if (this.User.userResto.Tb_Galleries === null) {
          this.User.userResto.Tb_Galleries = []
          this.loaded = true
        } else {
          api.getImage(this, this.User.userResto)
        }
        if (this.User.userResto.Tb_Resto_Menus === null) {
          this.loaded = true
          this.User.userResto.Tb_Resto_Menus = []
        } else {
          this.loaded = false
          api.getImageMenu(this, this.User.userResto)
        }
      }
    }
  },
  mounted () {
    this.initialF()
  }
}
</script>
<style>
.justify-center-fix{
  display: flex;
  align-items: center;
  justify-content: center;
}
.mw-35{
  min-width: 35px;
}
.mw-220{
  min-width: 220px;
  min-height: 100%;
  position: fixed;
}
.activeit{
  background: #1976d2;
}
form{
  font-family: arial;
}
.item-tittle{
  border-bottom: 1px solid #E0E0E0;
  font-size: 18px;
  color: #616161;
  font-family: arial;
}
.item-content{
  font-family: serif;
}
.card-content{
  min-height: 550px;
}
</style>
