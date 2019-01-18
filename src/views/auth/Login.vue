<template>
  <v-layout row align-center text-md-center wrap>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-text>
          <v-form>
            <v-text-field></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn v-for="lp in loginProviders" :key="lp.id" flat :href="lp.href" icon>
            <span class="mr-2"></span>
            <v-icon>fab {{lp.icon}}</v-icon>
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
      twitchOAuthConfig: {
        clientId: "",
        scope: "user:edit+user:read:email",
        redirectUri:
          "http://localhost:8081/auth/external/twitch/callback",
        responseType: "token"
      },
      loginProviders: [
        {
          id: "twitch",
          href: "",
          icon: "fa-twitch"
        }
      ]
    };
  },
  created() {
    this.applicationKey = this.$settings.ApplicationKey;
  },
  mounted() {
    this.$api.Twitch.GetSettings(this.applicationKey).then(res => {
      this.loginProviders[0].href = `https://id.twitch.tv/oauth2/authorize?client_id=${
        res.data.clientId
      }&redirect_uri=${this.twitchOAuthConfig.redirectUri}&response_type=${
        this.twitchOAuthConfig.responseType
      }&scope=${this.twitchOAuthConfig.scope}`;
    });
  },
  methods: {}
};
</script>