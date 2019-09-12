<template>
  <v-layout>
    <v-container>
      <v-navigation-drawer app v-if="isAuthenticated"></v-navigation-drawer>
      <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
          <span>KungRaseri</span>
          <span class="font-weight-lighter">&nbsp;Productions</span>
          <span class="font-weight-light">&nbsp;LLC</span>
        </v-toolbar-title>
        <v-btn flat href="stream">
          <span class="mr-2">stream</span>
          <v-icon>view_stream</v-icon>
        </v-btn>
        <v-btn flat href="projects">
          <span class="mr-2">projects</span>
          <v-icon>view_stream</v-icon>
        </v-btn>
        <v-btn flat href="music">
          <span class="mr-2">music</span>
          <v-icon>view_stream</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat href="https://twitch.tv/KungRaseri" target="_blank">
          <span class="mr-2">twitch</span>
          <v-icon>open_in_new</v-icon>
        </v-btn>
        <v-btn flat href="https://twitter.com/KungRaseri" target="_blank">
          <span class="mr-2">twitter</span>
          <v-icon>open_in_new</v-icon>
        </v-btn>
        <v-btn flat href="https://github.com/KungRaseri" target="_blank">
          <span class="mr-2">github</span>
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </v-toolbar>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  props: ["isAuthenticated"],
  data() {
    return {};
  }
};
</script>

<style>
</style>
