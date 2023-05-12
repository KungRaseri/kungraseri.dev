
<template>
  <v-layout row wrap justify-center>
    <ProjectPanel
      v-for="project in projects"
      v-bind:key="project.id"
      :project="project"
    />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProjectPanel from "@/components/ProjectPanel.vue";

@Component({
  components: { ProjectPanel },
})
export default class Projects extends Vue {
  
}
</script>
