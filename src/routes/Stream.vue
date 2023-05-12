<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as TwitchPlayer from 'vue-twitch-player';

let channel = 'kungraseri';

</script>

<template>
  <v-layout row wrap justify-center>
    <TwitchPlayer :width="'1280'" :height="'720'" {channel}></TwitchPlayer>
  </v-layout>
</template>

