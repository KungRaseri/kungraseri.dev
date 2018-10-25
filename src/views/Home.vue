<template>
<div class="home">
  <LandingPage />
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LandingPage from "@/components/LandingPage.vue"; // @ is an alias to /src

@Component({
  components: {
    LandingPage
  }
})
export default class Home extends Vue {}
</script>
