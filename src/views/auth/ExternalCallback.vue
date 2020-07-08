<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex md4>
        <v-card>
          <v-card-title>{{CallbackTitle}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>{{CallbackMessage}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IApp } from "@/interfaces/IApp";

@Component({})
export default class ExternalCallback extends Vue implements IApp {
  public $auth: any;
  public $logger: any;
  public CallbackTitle: string = "Welcome back!";
  public CallbackMessage: string =
    "Thank you for logging in. You will be redirected shortly...";
  public handleLoginEvent(data: any) {
    this.$router.push(data.state.target || "/");
  }

  public async created() {
    this.$auth
      .handleAuthentication()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        if (err.error) {
          this.CallbackTitle = "Something went wrong";
          this.CallbackMessage =
            "Your login/registration request has failed for some reason.";
          setTimeout(() => {
            this.$router.push("/");
          }, 3000);
        }
      });
  }
}
</script>
