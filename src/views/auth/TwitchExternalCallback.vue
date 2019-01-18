<template>
  <v-layout row align-center text-md-center wrap>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-text>{{message}}</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
let url_params = window.location.hash.substring(1).split("&");

export default {
  components: {},
  data() {
    return {
      applicationKey: "",
      twitchAuthenticationToken: {
        access_token: "",
        scope: "",
        token_type: ""
      },
      message: ""
    };
  },
  beforeCreate() {},
  created() {
    this.applicationKey = this.$settings.ApplicationKey;
  },
  mounted() {
    url_params.forEach(param => {
      let splitParam = param.split("=");
      this.twitchAuthenticationToken[splitParam[0]] = splitParam[1];
    });

    this.$api.Twitch.AuthSettings = this.twitchAuthenticationToken;
    this.$router.push("/")
  },
  methods: {}
};
</script>