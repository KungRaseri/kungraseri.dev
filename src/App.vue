<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <Navigation v-bind:isAuthenticated="isAuthenticated"></Navigation>
        <router-view></router-view>
        <Footer></Footer>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch('initializeStore');
  },
})
export default class App extends Vue {}
</script>
