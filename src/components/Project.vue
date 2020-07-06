
<template>
  <v-flex md4 xm2>
    <v-container>
      <v-card :id="`project-${project.id}`" class="mx-auto" flat outlined elevation raised>
        <a :href="project.url">
          <v-img class="white--text" height="200px" :src="project.image">
            <v-card-title class="align-end fill-height">{{project.imageTitle}}</v-card-title>
          </v-img>
        </a>
        <v-card-title>
          <h3>{{project.title}}</h3>
        </v-card-title>

        <v-card-text>{{project.description}}</v-card-text>
      </v-card>
    </v-container>
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
