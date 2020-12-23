
<template>
  <v-layout row wrap justify-center>
    <Project v-for="project in projects" v-bind:key="project.id" :project="project" />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Project from '@/components/Project.vue';

@Component({
  components: { Project },
})
export default class Projects extends Vue {
  public projects: any = [
    {
      id: 1,
      title: 'KungRaseri Productions LLC',
      url: 'https://kungraseri.dev',
      image: require('../assets/white_logo_transparent_background.png'),
      description: 'Development, Streaming and Music Production',
    },
    {
      id: 2,
      title: '[REDACTED] Gaming',
      url: 'https://redactedgaming.gg',
      image: require('@/assets/redacted_gaming.png'),
      description: 'Gaming and Roleplay Community',
    },
  ];
}
</script>
