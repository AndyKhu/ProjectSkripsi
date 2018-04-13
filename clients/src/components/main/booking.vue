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
                Booking
                </v-tabs-item>
                <v-tabs-item
                key="cpt"
                href="#cpt"
                ripple>
                Menu
                </v-tabs-item>
                <v-tabs-slider color="red"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-items>
                <v-tabs-content
                key="inp"
                id="inp">
                <v-container fluid grid-list-lg>
                    <v-layout row wrap>
                        <v-flex lg6>
                            <v-text-field
                            label="Full Name" light
                            placeholder=" "
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg6>
                            <v-text-field
                            label="Phone Number" light
                            placeholder=" "
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
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
