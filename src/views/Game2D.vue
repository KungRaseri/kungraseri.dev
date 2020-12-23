
<template>
  <v-layout row wrap align-baseline justify-center>
    <v-sheet elevation="1" width="800" height="600">
      <canvas id="game"></canvas>
    </v-sheet>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as ex from "excalibur";

@Component({})
export default class Game2D extends Vue {
  mounted() {
    const game = new ex.Engine({
      canvasElementId: "game",
      pointerScope: ex.Input.PointerScope.Document,
      viewport: { width: 800, height: 600 },
      resolution: ex.Resolution.Standard,
      backgroundColor: ex.Color.fromRGB(21, 21, 21),
    });

    this.initialize(game);
    this.loadScenes(game);

    game
      .start()
      .then((val) => {
        console.log(val);
      })
      .error((val) => {
        console.log(val);
      });
  }

  initialize(game: ex.Engine) {
    // create main menu
  }

  loadScenes(game: ex.Engine) {
    // load other scenes
  }
}
</script>