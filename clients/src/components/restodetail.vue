<template>
  <div id="app">
    <v-container fluid class="no-pad bc-white" >
      <v-layout row wrap>
        <v-flex lg12 class="restoD-top" v-if="loaded">
          <v-carousel style="height:300px">
            <v-carousel-item 
              lazy
              v-for="(item,i) in glp"
              :key="i"
              :src="item.src"
              transition="fade"
              reverse-transition="fade"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex lg12>
          <v-tabs
            v-model="active"
            slider-color="red">
              <v-tab
                key="inf"
                href="#tab-inf">
                Infomation
              </v-tab>
              <v-tab
                key="map"
                href="#tab-map">
                Maps
              </v-tab>
              <v-tab
                key="fac"
                href="#tab-fac">
                Facilities
              </v-tab>
              <v-tab
                key="menu"
                href="#tab-menu">
                Menu
              </v-tab>
              <v-tab
                key="review"
                href="#tab-review">
                Reviews
              </v-tab>
          </v-tabs>
                <!-- <router-link to="/main/booking">
                  <div class="test">
                    BOOKING
                  </div>
                </router-link>
                <v-tabs-slider color="red"></v-tabs-slider> -->
            <v-tabs-items v-model="active">
                <v-tab-item
                key="inf"
                id="tab-inf">
                <v-container fluid class="content-cont-detail">
                  <v-layout row wrap>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title">
                        <v-icon light>local_dining</v-icon>
                        <h4>Dinning Style </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info">
                        {{data.style}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title">
                        <v-icon light>credit_card</v-icon>
                        <h4>Price Range </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info">
                        Rp.{{data.price_from}} - Rp.{{data.price_end}}
                      </v-flex>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title">
                        <v-icon light>watch_later</v-icon>
                        <h4>Hours Of Operation </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info">
                        {{data.dayoperation_from}} - {{data.dayoperation_end}}, {{data.timeoperation_from}} - {{data.timeoperation_end}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title">
                        <v-icon light>home</v-icon>
                        <h4>Website </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info">
                        {{data.web}}
                      </v-flex>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 lg6 class="col-b">
                      <v-flex lg12 class="mini-title">
                        <v-icon light>phone</v-icon>
                        <h4>Phone Number </h4>
                      </v-flex>
                      <v-flex lg12 class="mini-info">
                        {{data.phone_number}}
                      </v-flex>
                    </v-flex>
                    <v-flex xs12 lg6 class="col-b">
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-tab-item>
                <v-tab-item
                key="map"
                id="tab-map">
                test2
                </v-tab-item>
                <v-tab-item
                key="fac"
                id="tab-fac">
                <v-container fluid class="content-cont-detail">
                  <v-layout row wrap>
                    <v-flex lg6 class="col-b" 
                    v-for="(item,i) in fac" :key="i">
                      <v-flex lg12 class="mini-title">
                        <v-icon light>{{item.icons}}</v-icon>
                        <h4>{{item.name}}</h4>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-tab-item>
                <v-tab-item
                key="menu"
                id="tab-menu">
                <v-container fluid class="content-cont-detail">
                  <v-layout row wrap>
                    <v-flex lg6 class="col-b" v-for="(item,i) in menu" :key="i">
                      <v-card>
                        <v-container fluid grid-list-lg>
                          <v-layout row>
                            <v-flex xs12 lg6>
                              <v-card-media
                                :src="item.thumb"
                                height="150px"
                                cover
                              ></v-card-media>
                            </v-flex>
                            <v-flex xs12 lg6>
                              <v-layout row>
                                <v-flex xs10>
                                  <div class="headline">{{item.data.name}}</div>                                  
                                </v-flex>
                                <v-flex xs2 class="headline">
                                  {{item.data.price}}
                                </v-flex>
                              </v-layout>
                              <v-layout row>
                                <v-flex xs12>
                                  <div>{{item.data.description}}</div>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-tab-item>
            </v-tabs-items>
            </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import '../assets/restodetail.css'
import gv from '../globalvariable'
export default {
  data: () => ({
    active: 'tab-inf',
    glp: [],
    fac: [],
    menu: [],
    menupic: [],
    loaded: false,
    data: {
    }
  }),
  methods: {
    save () {
      console.log(this.data)
    }
  },
  mounted () {
    let restoid = location.href.split('?id=')[1]
    gv.getrestodetail(this, restoid, '/')
  }
}
</script>
