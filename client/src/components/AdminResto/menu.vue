<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 lg4 v-for="(item,i) in listMenu" :key="i" >
        <router-link :to="{name: item.link}">
          <v-card class='segment' :class="item.color">
            <div class='segment-item h-150px'>
              <div class='item'>
                <v-icon class='super-large'>{{item.icon}}</v-icon>
                <label class="d-block">{{item.label}}</label>
              </div>
            </div>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default{
  data: () => ({
    listMenu: [
      { link: 'restoSetup', color: 'segment-red', icon: 'info_outline', label: 'Resto Info' },
      { link: 'restoSetup', color: 'segment-green', icon: 'assignment', label: 'Confirmation List' },
      { link: 'restoSetup', color: 'segment-purple', icon: 'donut_small', label: 'Confirmation List' }
    ]
  })
}
</script>
