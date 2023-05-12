<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-actions>
          <v-btn v-for="lp in loginProviders" :key="lp.id" text :href="lp.href">
            <span class="mr-2">Login with {{lp.id}}</span>
            <v-icon>{{lp.icon}}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  components: {},
  data() {
    return {
      applicationKey: "",
      loginProviders: [
        {
          id: "twitch",
          href: "",
          icon: "mdi-twitch"
        },
        {
          id: "github",
          href: "",
          icon: "mdi-github"
        }
      ]
    };
  },
  created() {
    this.applicationKey = this.$settings.ApplicationKey;
  },
  mounted() {
    // window.location.replace(
    //   "https://kungraseri-productions.us.auth0.com/authorize"
    // );
  },
  methods: {}
};
</script>