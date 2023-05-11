
<template>
  <v-layout row wrap justify-center>
    <TwitchPlayer :width="'1280'" :height="'720'" :channel="channel"></TwitchPlayer>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as TwitchPlayer from 'vue-twitch-player';

@Component({
  components: {
    TwitchPlayer,
  },
  data() {
    return {
      channel: 'kungraseri',
    };
  },
})
export default class Stream extends Vue {}
</script>
