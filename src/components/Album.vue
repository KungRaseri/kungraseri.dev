
<template>
  <v-flex md2 xs2 class="mx-2">
    <v-card :id="`album-${album.id}`" flat>
      <a :href="album.url">
        <v-img class="white--text" contain max-height="500" :src="album.image">
          <v-card-title class="align-end fill-height">{{album.title}}</v-card-title>
        </v-img>
      </a>
      <v-card-text>{{album.description}}</v-card-text>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Album extends Vue {
  @Prop({ type: Object })
  public album: object | undefined;
}
</script>
