<template>
  <v-layout class="ma-0 pa-0" justify-center align-center fill-height>
    <v-sheet elevation="1" width="90%" height="90%">
      <GameComponent
        :game="game"
        v-for="game in games"
        :key="game.id"
        class="ma-2"
      />
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
import GameComponent from "@/components/Game/GameComponent.vue";

@Component({ components: { GameComponent } })
export default class Games extends Vue {
  games: any = [
    {
      id: 1,
      title: "Browser Game",
      url: "games/1",
      image: require("../assets/white_logo_transparent_background.png"),
      description: "Become a hero in this browser game!",
    },
  ];

  created() {
    const that = this;

    Vue.prototype.$socket.start({
      log: true,
    });
  }
  sockets: any = {
    PlayerJoined(data: any) {},
  };
}
</script>