<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirmation</v-card-title>
        <v-card-text>Data has been edited, Want to save it?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="save">Yes</v-btn>
          <v-btn color="green darken-1" flat @click="cancel">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$emit('save')
    }
  }
}
</script>
