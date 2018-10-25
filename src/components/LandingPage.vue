<template>
<v-container>
  <v-layout row align-center text-md-center wrap>
    <v-flex >
      <VueTwitchPlayer :width="'1280'" :height="'720'" :channel="channel"></VueTwitchPlayer>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import VueTwitchPlayer from "vue-twitch-player";

export default {
  components: {
    VueTwitchPlayer
  },
  data() {
    return {
      channel: "kungraseri"
    };
  }
};
</script>

<style>
</style>
