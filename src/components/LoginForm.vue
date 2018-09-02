<template>
<v-card class="elevation-12">
    <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
        <v-form v-bind="user">
            <v-text-field prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
            <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
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
        <v-btn color="primary" @click="loginEmail()">Login</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    loginEmail() {
      var user = this.user;
      var requestOptions = {};

      this.$store.dispatch("login", {
        user,
        requestOptions
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
