
<template>
  <v-layout>
    <v-flex v-for="project in projects" v-bind:key="project.id" md4 xm2>
      <v-container>
        <v-card flat tile>
          <v-card-title>{{project.title}}</v-card-title>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  components: {},
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "Test"
        },
        {
          id: 2,
          title: "Test"
        },
        {
          id: 3,
          title: "Test"
        },
        {
          id: 4,
          title: "Test"
        },
        {
          id: 5,
          title: "Test"
        },
        {
          id: 6,
          title: "Test"
        }
      ]
    };
  }
};
</script>
