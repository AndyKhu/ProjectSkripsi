<template>
    <div>
        <v-layout row justify-center class="item-normal-margin">
            <v-flex xs12 lg12>
                <v-card class="margin-35px pointer-normal">
                    <v-tabs
                        fixed-tabs
                        v-model="currentItem"
                        slider-color="red">
                    <v-tab
                        key="inf"
                        href="#tab-inf">
                        Information
                    </v-tab>
                    <v-tab
                        key="fac"
                        href="#tab-fac">
                        Facility
                    </v-tab>
                    <v-tab
                        key="dur"
                        href="#tab-dur">
                        Duration
                    </v-tab>
                    <v-tab
                        key="gal"
                        href="#tab-gal">
                        Gallery
                    </v-tab>
                    <v-tab
                        key="men"
                        href="#tab-men">
                        Menu
                    </v-tab>
                    </v-tabs>
                <v-tabs-items v-model="currentItem">
                    <v-tab-item
                        key="inf"
                        id="tab-inf">
                       <RestoInfo ref="restoinfo">
                       </RestoInfo>
                    </v-tab-item>
                    <v-tab-item
                        key="fac"
                        id="tab-fac">
                       <Facility ref="facility">
                       </Facility>
                    </v-tab-item>
                    <v-tab-item
                        key="dur"
                        id="tab-dur">
                       <Duration ref="duration">
                       </Duration>
                    </v-tab-item>
                    <v-tab-item
                        key="gal"
                        id="tab-gal">
                       <Gallery ref="gallery">
                       </Gallery>
                    </v-tab-item>
                    <v-tab-item
                        key="men"
                        id="tab-men">
                       <Menus ref="menu">
                       </Menus>
                    </v-tab-item>
                    <v-btn
                        color="light-blue darken-1"
                        dark
                        small
                        relative
                        @click="save()"
                        bottom
                        right
                        fixed
                        fab>
                        <v-icon>save</v-icon>
                    </v-btn>
                 </v-tabs-items>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar
            :timeout= "2000"
            :color="colors"
            top
            v-model="snackbar"
            >
            {{ errormsg }}
            <v-btn flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>
<script>
import RestoInfo from './restoinfo.vue'
import Facility from './facility.vue'
import Duration from './duration.vue'
import Gallery from './gallery.vue'
import Menus from './menu.vue'
import auth from '../../../router/auth'
import gv from '../../../globalvariable'

export default {
  data: () => ({
    a: [],
    snackbar: false,
    errormsg: '',
    colors: '',
    currentItem: 'tab-inf',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    data: {
      info: {},
      fac: [],
      dur: [],
      gal: {},
      menu: []
    }
  }),
  components: {
    RestoInfo,
    Facility,
    Duration,
    Menus,
    Gallery
  },
  methods: {
    save () {
      this.data = {
        info: this.$refs.restoinfo.data,
        fac: this.$refs.facility.items,
        dur: this.$refs.duration.items,
        gal: {
          fp: this.$refs.gallery.fin,
          p: this.$refs.gallery.files
        },
        menu: this.$refs.menu.items,
        userid: auth.user.userid
      }
      gv.restosave(this, this.data, '/')
    },
    test () {
      console.log(this.$refs.menu.items)
    }
  },
  mounted () {
    gv.getresto(this, auth.user.userid, '/')
  }
}
</script>