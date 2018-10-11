<template>
<v-content class="hero-class-editor">
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <hero-class-form></hero-class-form>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</template>

<script>
import HeroClassForm from "../components/HeroClassForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HeroClassEditor",
  components: {
    HeroClassForm
  },
  data() {
    return {
      heroClasses: {},
      heroSkills: {},
      heroRaces: {}
    };
  },
  mounted() {
    // this.heroClasses = this.getHeroClasses();
  },
  methods: {
    ...mapActions(["addEditHeroClass"]),
    ...mapGetters(["getHeroClasses", "getHeroSkills", "getHeroRaces"])
  }
};
</script>
