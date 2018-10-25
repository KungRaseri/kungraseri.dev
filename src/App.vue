<template>
<v-app dark>
  <Navigation v-bind:isAuthenticated="isAuthenticated"></Navigation>
  <v-content>
    <LandingPage />
  </v-content>
</v-app>
</template>

<script>
import LandingPage from "@/components/LandingPage.vue";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    LandingPage,
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
};
</script>
