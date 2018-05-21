<template>
  <div id="app" class="app">
    <auth-layout v-if="!isAuthenticated"></auth-layout>
    <layout v-else></layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Layout from "components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";

export default {
  name: "app",
  components: {
    AuthLayout,
    Layout
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>

<style lang="scss">
// @import "sass/main";
body {
  height: 100%;
  .app {
    height: 100%;
  }
}
</style>
