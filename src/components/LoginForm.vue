<template>
<v-card class="elevation-12">
    <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
        <v-form v-bind="account">
            <v-text-field v-model="account.email" id="Email" prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
            <v-text-field v-model="account.password" id="Password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn fab color="accent">
            <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
        </v-btn>
        <v-btn fab color="accent">
            <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
        </v-btn>
        <v-btn fab color="accent" @click="loginTwitch()">
            <font-awesome-icon :icon="['fab', 'twitch']"></font-awesome-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="loginEmail()">Login</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      account: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["updateAccount", "updateIsAuthenticated"]),
    loginEmail() {
      // eslint-disable-next-line
      this.$api.Auth.Login(this.account).then(response => {
        var account = response.data.value;
        this.updateAccount(account);
        this.updateIsAuthenticated(true);
      });
    },
    loginTwitch() {
      this.$api.authenticate("twitch", { failureRedirect: "/" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
