<template>
  <v-container fluid class="cont-reserve">
    <v-layout row wrap justify-center>
      <v-flex xs10>
        <v-card class="card-content">
          <v-flex xs12 class="py-2 px-3 item-tittle">
            Restaurant Reservation
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6 class="py-2 px-3">
                <formTextField v-model="data.fullName" :label="'Full Name'"/>
                <formTextField v-model="data.Type" :label="'Reservation Type'"/>
                <formTextField v-model="data.Duration" :label="'Duration'"/>
              </v-flex>
              <v-flex xs6 class="py-2 px-3">
                <formTextField v-model="data.Phone" :label="'Phone Number'"/>
                <DateTimePicker v-model="data.reserveDate" />
                <formTextField v-model="data.Seat" :label="'Number of Seat'"/>
              </v-flex>
              <v-flex xs12 class="py-2 px-3">
                <formTextField rows="4" multi-line v-model="data.Note" :label="'Note'"/>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Member from '@/api/member.js'
import DateTimePicker from '@/components/helper/formComponent/formDateTimePicker'
export default {
  components: {
    DateTimePicker
  },
  data () {
    return {
      data: {
        fullName: null,
        Phone: null,
        Type: null,
        reserveDate: null,
        Duration: null,
        Seat: null,
        Note: null
      },
      resto: null
    }
  },
  methods: {
    input () {
    }
  },
  mounted () {
    Member.getRestoDetailmin(this, this.$route.params.id).then(res => {
      this.resto = res.data
      this.resto.FoodMenu.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        val.src = URL.createObjectURL(x)
        delete val.file
      })
    })
  }
}
</script>
<style scoped>
.cont-reserve{
  background: #eeeeee;
}
.card-content{
  min-height: 550px;
}
.item-tittle{
  background: #2196F3;
  color: #ffffff;
  border-bottom: 1px solid #E0E0E0;
  font-weight: bold;
  font-size: 18px;
  font-family: arial;
}
</style>
