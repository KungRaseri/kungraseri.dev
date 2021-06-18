<template>
  <v-layout class="ma-0 pa-0" justify-center align-center fill-height>
    <v-sheet elevation="1" width="90%" height="90%">
      <Game :game="game" v-for="game in games" :key="game.id" class="ma-2" />
    </v-sheet>
  </v-layout>
</template>

<style lang="scss" scoped>
body {
  overflow: hidden !important;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GamePanel from "@/components/GamePanel.vue";

@Component({ components: { GamePanel } })
export default class Main extends Vue {
  session: any;
  
  created() {
    Vue.prototype.$socket.start({
      log: true,
    });
  }
  sockets: any = {
    PlayerJoined(data: any) {},
  };
}
</script>