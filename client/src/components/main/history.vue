<template>
  <v-layout row justify-center class="item-normal-margin">
    <v-flex lg12>
        <v-card light class="margin-35px pointer-normal">
            <v-tabs v-model="active">
            <v-tabs-bar light>
                <v-tabs-item
                key="inp"
                href="#inp"
                ripple>
                In Progress
                </v-tabs-item>
                <v-tabs-item
                key="cpt"
                href="#cpt"
                ripple>
                Complete
                </v-tabs-item>
                <v-tabs-slider color="red"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-items>
                <v-tabs-content
                key="inp"
                id="inp">
                <v-card>
                  <v-layout row>
                    <v-flex lg4>
                      <v-card-media
                        height="200px"
                        src="/static/Resto/02.jpg"
                      ></v-card-media>
                    </v-flex>
                    <v-flex lg8 class="pad-20px pad-bot-0">
                      <v-layout row class="borbot pad-10px">
                        <v-flex lg8>
                          Restaurant
                        </v-flex>
                        <v-flex lg4 text-xs-right>
                          12 Dec 2017
                          <br>
                          08.00 - 14.00
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap class="pad-20px pad-bot-0" >
                        <v-flex lg12>
                          Type : 
                        </v-flex>
                        <v-flex lg12>
                          note : 
                        </v-flex>
                        <v-flex text-xs-right>
                          <v-btn icon dark>
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
                </v-tabs-content>
                <v-tabs-content
                key="cpt"
                id="cpt">
                test2
                </v-tabs-content>
            </v-tabs-items>
            </v-tabs>
        </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import '../../assets/history.css'
export default {
  data: () => ({
    active: null
  })
//   methods: {
//   }
}
</script>
