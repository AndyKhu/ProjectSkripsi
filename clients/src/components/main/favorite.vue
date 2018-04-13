<template>
  <v-layout row justify-center class="item-normal-margin">
    <v-flex lg12>
        <v-card light class="margin-35px pointer-normal">
            <v-flex lg12 class="title-left">
                My Favorite
            </v-flex>
            <v-container fluid grid-list-lg class="fav-cont">
                <v-layout row wrap>
                <v-flex lg3 class="restoI">
                    <router-link to="D">
                        <v-card>
                        <v-card-media
                            class="white--text"
                            height="200px"
                            :src="`/static/Resto/01.jpg`"
                        >
                        </v-card-media>
                        <v-card-title>
                            <div>
                            <span>Whitehaven Beach</span><br>
                            <span>Whitsunday Island, Whitsunday Islands</span>
                            </div>
                        </v-card-title>
                        <v-card-actions class="footer-card">
                            <v-btn icon dark>
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </router-link>
                </v-flex>
                </v-layout row wrap>
            </v-container>
        </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import '../../assets/favorite.css'
export default {
}
</script>
