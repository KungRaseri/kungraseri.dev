
<template>
  <v-flex md4 xm2 class="mx-2">
    <v-card :id="`game-${game.id}`">
      <a :href="game.url">
        <v-img
          class="white--text game"
          contain
          min-height="250"
          max-height="500"
          :src="game.image"
        >
          <v-card-title class="align-end fill-height">{{
            game.title
          }}</v-card-title>
        </v-img>
      </a>
      <v-card-text>{{ game.description }}</v-card-text>
    </v-card>
  </v-flex>
</template>

<style lang="scss" scoped>
.game {
  background: #000;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class GamePanel extends Vue {
  @Prop({ type: Object })
  public game: object | undefined;
}
</script>
