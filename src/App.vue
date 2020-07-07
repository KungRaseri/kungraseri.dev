<template>
  <v-app>
    <Navigation v-bind:isAuthenticated="isAuthenticated"></Navigation>
    <v-layout row wrap>
      <router-view></router-view>
    </v-layout>
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
export default class App extends Vue {
  constructor() {
    super();
  }
}
</script>
