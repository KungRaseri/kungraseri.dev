<template>
  <v-app>
    <Navigation v-bind:isAuthenticated="isAuthenticated"></Navigation>
    <v-layout row wrap>
      <router-view></router-view>
    </v-layout>
    <v-footer app dense class="ma-0 pa-0">
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md12>
          <v-card flat class="ma-0 px-3">
            <v-card-actions>
              <span class="mx-1">&copy; {{new Date().getFullYear()}}</span>-
              <span class="mx-1 text-uppercase">
                <span class="font-weight-bold">KungRaseri</span>
                <span class="font-weight-lighter">&nbsp;Productions</span>
                <span class="font-weight-light">&nbsp;LLC</span>
              </span>
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
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<style scoped lang="scss">
* {
  font-family: "Blinker", sans-serif;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Navigation
  },
  data() {
    return {
      isAuthenticated: false
    };
  },
  beforeCreate() {
    this.$store.dispatch("initializeStore");
  }
})
export default class App extends Vue {
  constructor() {
    super();
  }
}
</script>
