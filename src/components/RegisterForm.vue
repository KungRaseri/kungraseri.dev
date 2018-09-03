<template>
<v-card class="elevation-12">
    <v-toolbar dark color="primary">
        <v-toolbar-title>Registration</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
        <v-form v-bind="account">
            <v-text-field v-model="account.email" prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
            <v-text-field v-model="account.password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            <v-text-field v-model="confirmPassword" id="confirmpassword" prepend-icon="lock" name="confirmpassword" label="Confirm Password" type="password"></v-text-field>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn fab color="accent">
            <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
        </v-btn>
        <v-btn fab color="accent">
            <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
        </v-btn>
        <v-btn fab color="accent">
            <font-awesome-icon :icon="['fab', 'twitch']"></font-awesome-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="registerEmail()">Register</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisterForm",
  data() {
    return {
      account: {
        email: "",
        password: ""
      },
      confirmPassword: ""
    };
  },
  methods: {
      ...mapActions(['updateAccount']),
    registerEmail() {
      // eslint-disable-next-line
      this.$api.Auth.Register(this.account).then(response => {
        var account = response.data.value;
        this.updateAccount(account);
      });
    },
    loginTwitch() {
      this.$api.Auth.authenticate("twitch", { failureRedirect: "/" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
