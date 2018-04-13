<template>
  <v-app>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 md6 lg5 class="content-text">
        <h1> 404 </h1>
        <h2> Page Not Found </h2>
        <p> We Can't Seem Find The Page You're Looking For</p>
        <router-link to="/">
        <v-btn large color="error" outline>
          Go Home!
        </v-btn>
        </router-link>
      </v-flex>
      <v-flex xs12 md5 lg5 class="container-bc">
        <img id="bc" src="../assets/404.png" alt="">
      </v-flex>
    </v-layout>
  </v-app>
</template>
<style scoped>
@media only screen and (max-width: 599px) {
  h1{
    font-size: 10vh !important
  }
  h2{
    font-size: 5vh !important
  }
  .content-text{
    padding: 30px;
    line-height: 8vh !important;
  }
  .container-bc{
    text-align: center;
  }
  #bc {
    width: 250px
  }
}
h1{
  font-size: 20vh
}
h2{
  font-size: 10vh
}
.content-text{
  line-height: 15vh;
  text-align: center;
}
p{
  font-size: 2.5vh;
  line-height: 2.5vh;
}
</style>
