<template>
  <v-layout row align-center text-md-center wrap>
    <v-flex></v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  data() {
    return {
      channel: 'kungraseri',
    };
  },
})
export default class LandingPage extends Vue {}
</script>
