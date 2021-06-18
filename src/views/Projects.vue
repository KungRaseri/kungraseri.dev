
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
  public projects: any = [
    {
      id: 1,
      title: "KungRaseri Productions",
      url: "https://kungraseri.dev",
      image: require("../assets/white_logo_transparent_background.png"),
      description: "Development, Streaming and Music Production",
    },
    {
      id: 2,
      title: "[REDACTED] Gaming (Closed)",
      url: "https://kungraseri.dev",
      image: require("@/assets/redacted_gaming.png"),
      description: "Gaming and Roleplay Community",
    },
  ];
}
</script>
