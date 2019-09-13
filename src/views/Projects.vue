
<template>
  <v-layout row wrap>
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
      url: '#',
      image: '',
      description: 'Freelancing, Streaming and Music services',
    },
    {
      id: 2,
      title: 'Championship Arena',
      url: '#',
      image: '',
      description: 'eSports tournament website',
    },
    {
      id: 3,
      title: 'RetweetRP',
      url: '#',
      image: '',
      description: 'GTA V Roleplay Community',
    },
  ];
}
</script>
