<template>
  <v-layout row class="ma-0 pa-0">
    <v-navigation-drawer app v-if="isAuthenticated"></v-navigation-drawer>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn text tile to="/" large>
          <span class="font-weight-bold">KungRaseri</span>
          <span class="font-weight-lighter">&nbsp;Productions</span>
          <span class="font-weight-light">&nbsp;LLC</span>
        </v-btn>
      </v-toolbar-title>
      <v-btn text to="stream" large>
        <span class="mr-2">stream</span>
        <v-icon>mdi-theater</v-icon>
      </v-btn>
      <v-btn text to="projects" large>
        <span class="mr-2">projects</span>
        <v-icon>mdi-dev-to</v-icon>
      </v-btn>
      <v-btn text to="music" large>
        <span class="mr-2">music</span>
        <v-icon>mdi-folder-music</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text href="https://twitch.tv/KungRaseri" target="_blank" large>
        <span class="mr-2">twitch</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn text href="https://twitter.com/KungRaseri" target="_blank" large>
        <span class="mr-2">twitter</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn
        text
        href="https://dev.azure.com/KungRaseri/KungRaseri%20Productions"
        target="_blank"
        large
      >
        <span class="mr-2">source</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
  </v-layout>
</template>
<style>
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NavigationComponent extends Vue {
  @Prop({ type: Boolean, default: false })
  public isAuthenticated: boolean = false;
}
</script>