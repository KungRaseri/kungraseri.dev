
<template>
  <v-layout row wrap justify-center>
    <Album v-for="album in albums" v-bind:key="album.id" :album="album" />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Album from "@/components/Album.vue";

@Component({
  components: { Album },
})
export default class Music extends Vue {
  public albums: any = [
    {
      id: 1,
      title: "Ascension",
      url: "https://soundcloud.com/kungraseri/sets/ascension",
      image: require("@/assets/music/albums/ascension/album_cover.jpg"),
      description:
        "Released in 2018. Ascension is my first album and the start of my music production journey.",
    },
    {
      id: 2,
      title: "Emergent",
      url: "https://soundcloud.com/kungraseri/sets/emergent",
      image: require("@/assets/music/albums/emergent/album_cover.jpg"),
      description:
        "Released in 2020. Emergent is my second album and was supposed to be released in 2019.",
    },
    {
      id: 3,
      title: "Expanse",
      url: "https://soundcloud.com/kungraseri/sets/expanse",
      image: require("@/assets/logo.png"),
      description:
        "Coming soon™ 2021 or something. Listen to the album now on SoundCloud.",
    },
  ];
}
</script>
