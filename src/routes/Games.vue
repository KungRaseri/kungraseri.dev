<template>
  <v-layout row wrap class="ma-0 pa-0" justify-center align-center fill-height>
    <v-sheet elevation="1" width="90%" height="90%">
      <GamePanel
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
import GamePanel from "@/components/GamePanel.vue";

@Component({ components: { GamePanel } })
export default class Games extends Vue {
  games: any = [
    {
      id: 1,
      title: "Legends of Dranos",
      url: "games/legends-of-dranos",
      image: require("../legends-of-dranos/assets/dranos_cover.png"),
      description: "Become a legend in the world of Dranos!",
    },
  ];

  created() {}
}
</script>