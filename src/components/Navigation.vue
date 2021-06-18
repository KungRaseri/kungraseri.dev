<template>
  <v-app-bar app dense>
    <v-toolbar-title>
      <a href="/">
        <v-img contain max-height="75" width="250" :src="logoPath"></v-img>
      </a>
    </v-toolbar-title>
    <v-btn text to="/stream" large>
      <span class="mr-2">stream</span>
      <v-icon>mdi-theater</v-icon>
    </v-btn>
    <v-btn text to="/projects" large>
      <span class="mr-2">projects</span>
      <v-icon>mdi-dev-to</v-icon>
    </v-btn>
    <!-- <v-btn text to="/games" large>
      <span class="mr-2">games</span>
      <v-icon>mdi-gamepad-variant</v-icon>
    </v-btn> -->
    <v-btn text to="/music" large>
      <span class="mr-2">music</span>
      <v-icon>mdi-folder-music</v-icon>
    </v-btn>
    <v-divider vertical class="mx-3"></v-divider>
    <v-spacer></v-spacer>
    <v-layout row wrap justify-end>
      <v-divider vertical class="mx-3"></v-divider>
      <v-flex xs2>
        <v-btn
          text
          large
          v-if="!isAuthenticated"
          color="primary"
          @click="loginClicked"
          >Login / Register</v-btn
        >
        <v-btn
          text
          large
          color="secondary"
          v-else-if="isAuthenticated"
          @click="logoutClicked"
          >Logout</v-btn
        >
      </v-flex>
    </v-layout>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class NavigationComponent extends Vue {
  @Prop({ type: Boolean, default: false })
  public isAuthenticated: boolean = false;

  private logoPath = require("../assets/white_logo_transparent_background.png");

  public loginClicked() {
    this.$emit("loginClicked");
  }
  public logoutClicked() {
    this.$emit("logoutClicked");
  }
}
</script>