<template>
  <div id="app">
    <router-view/>
    <saveConfirmation :value="getStatus().actions" @save="save" @cancel="cancel"/>
  </div>
</template>

<script>
import saveConfirmation from '@/components/helper/saveConfirmation'
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
  .segment-red{
    border-color: #F44336;
  }
  .segment-red:hover{
    background-color: #DB2828;
  }
  .segment-red,.segment-item label,.segment-red .segment-item .item .super-large {
    color: #F44336;
  }
  .segment-red:hover,.segment-item:hover label,.segment-red:hover .segment-item .item .super-large{
    color: #ffffff
  }
  html::-webkit-scrollbar {
    display: none;
  }
</style>
