
<template>
  <v-flex md2 xm2 class="mx-2">
    <v-card :id="`project-${project.id}`" flat>
      <a :href="project.url">
        <v-img class="white--text" contain max-height="500" :src="project.image">
          <v-card-title class="align-end fill-height">{{project.title}}</v-card-title>
        </v-img>
      </a>
      <v-card-text>{{project.description}}</v-card-text>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Project extends Vue {
  @Prop({ type: Object })
  public project: object | undefined;
}
</script>
