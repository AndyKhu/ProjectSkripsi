<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 lg3>
        <router-link :to="{name:'RestoInfo'}">
          <v-card class='segment segment-red'>
            <div class='segment-item h-150px'>
              <div class='item'>
                <v-icon class='super-large'>info_outline</v-icon>
                <label class="d-block">Resto Info</label>
              </div>
            </div>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>
