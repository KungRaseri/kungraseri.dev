<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <LandingPage msg="Welcome to Your Vue.js + TypeScript App" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LandingPage from '@/components/LandingPage.vue'; // @ is an alias to /src

@Component({
  components: {
    LandingPage,
  },
})
export default class Home extends Vue {}
</script>
