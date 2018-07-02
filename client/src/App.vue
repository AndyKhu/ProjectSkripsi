<template>
  <div id="app">
    <router-view/>
    <saveConfirmation :value="getStatus().actions" @save="save" @cancel="cancel"/>
    <v-snackbar
      top
      :timeout="2500"
      :color="getdialogMsg().color"
      v-model="getdialogMsg().status"
    >
      {{ getdialogMsg().txtmsg }}
      <v-btn small flat color="white" @click.native="getdialogMsg().status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import saveConfirmation from '@/components/helper/saveConfirmation'
import '@/assets/css/loading.css'
import '@/assets/css/font.css'
export default {
  name: 'App',
  data: () => ({
  }),
  components: {
    saveConfirmation
  },
  methods: {
    getStatus () {
      return this.$store.getters['Helper/saveD']
    },
    save () {
      this.getStatus().next()
      this.$store.dispatch('Helper/setSaveD', {next: null, actions: false})
    },
    cancel () {
      this.getStatus().next(false)
      this.$store.dispatch('Helper/setSaveD', {next: null, actions: false})
    },
    getdialogMsg () {
      return this.$store.getters['getdialogMsg']
    }
  }
}
</script>

<style>
@media only screen and (max-width: 564px){
  .h-150px{
    height: 80px !important;
  }
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.super-large{
  font-size:70px;
}
.segment{
  padding: 25px;
  border-top: 2px solid #000000;
  border-radius: .28571429rem;
  -webkit-transition: background-color 700ms linear;
  -ms-transition: background-color 700ms linear;
  transition: background-color 700ms linear;
}
  .segment-item{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .h-150px{
    height: 150px;
  }
    .item{
      text-align: center;
    }
    .item label{
      font-size: 16px;
      margin-top: .5rem;
      font-weight: bold;
    }
  .segment-red:hover{
    background-color: #DB2828;
  }
  .segment-red,
  .segment-red label,
  .segment-red .super-large {
    color: #F44336;
    border-color: #F44336;
  }
  .segment-purple:hover{
    background-color: #673ab7;
  }
  .segment-purple,
  .segment-purple label,
  .segment-purple .super-large {
    border-color: #673ab7;
    color: #673ab7;
  }
  .segment-green:hover{
    background-color: #4CAF50;
  }
  .segment-green,
  .segment-green label,
  .segment-green .super-large {
    border-color: #4CAF50;
    color: #4CAF50;
  }
  .segment:hover,
  .segment:hover label,
  .segment:hover .super-large{
    color: #ffffff
  }

  html::-webkit-scrollbar {
    display: none;
  }
  .force-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .force-center-left{
    display: flex;
    align-items: center;
  }
  .font-bold{
    font-weight: bold;
  }
  .menu__content .menu__content--select   .menu__content--autocomplete .menuable__content__active{
    overflow: hidden;
  }
</style>
