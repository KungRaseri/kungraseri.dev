
<template>
  <v-layout row align-center text-md-center wrap>
    <v-flex>
      <TwitchPlayer :width="'1280'" :height="'720'" :channel="channel"></TwitchPlayer>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TwitchPlayer from '@/components/TwitchPlayer.vue';

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
