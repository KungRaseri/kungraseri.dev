<template>
  <v-app>
    <Navigation
      :isAuthenticated="isAuthenticated"
      :user="user"
      @loginClicked="login"
      @logoutClicked="logout"
    ></Navigation>
    <v-layout row wrap>
      <router-view></router-view>
    </v-layout>
    <v-footer app dense class="ma-0 pa-0">
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md12>
          <v-card flat class="ma-0 px-3">
            <v-card-actions>
              <span class="mx-1">&copy; {{new Date().getFullYear()}}</span>-
              <span class="mx-1 text-uppercase">
                <span class="font-weight-bold">KungRaseri</span>
                <span class="font-weight-lighter">&nbsp;Productions</span>
                <span class="font-weight-light">&nbsp;LLC</span>
              </span>
              <v-spacer></v-spacer>
              <v-btn text href="https://twitch.tv/KungRaseri" target="_blank" large>
                <span class="mr-2">twitch</span>
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
              <v-btn text href="https://twitter.com/KungRaseri" target="_blank" large>
                <span class="mr-2">twitter</span>
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
              <v-btn
                text
                href="https://dev.azure.com/KungRaseri/KungRaseri%20Productions"
                target="_blank"
                large
              >
                <span class="mr-2">source</span>
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<style scoped lang="scss">
* {
  font-family: "Blinker", sans-serif;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";
import { IApp } from "./interfaces/IApp";

@Component({
  components: {
    Navigation
  }
})
export default class App extends Vue implements IApp {
  public $auth: any;
  public $logger: any;
  public user: any = {};
  public isAuthenticated = false;

  constructor() {
    super();
  }

  public created() {
    this.$auth
      .renewToken(this.$store.getters["UserProfile/isAuthenticated"])
      .then((result: any) => {
        console.log("renew-result", result);
      })
      .catch((err: any) => {
        if (err.includes("not authenticated")) {
          return;
        }
        console.log("err", err);
      });
  }

  public mounted() {
    this.initState();
  }

  public updated() {
    this.initState();
  }

  public initState() {
    this.isAuthenticated = this.$store.getters["UserProfile/isAuthenticated"];
    if (this.isAuthenticated) {
      this.user = this.$store.getters["UserProfile/User"];
      this.$logger.identify(this.user.user_id, {
        name: this.user.username,
        email: this.user.name
      });
    }
  }

  public async login() {
    this.$auth.login();
  }

  public handleLoginEvent(data: any) {
    this.$store.commit("UserProfile/setToken", data.token);
    this.$store.commit("UserProfile/setUser", data.profile);
  }

  public logout() {
    this.$store.commit("UserProfile/setToken", null);
    this.$store.commit("UserProfile/setUser", null);
    this.$auth.logout();
  }
}
</script>
