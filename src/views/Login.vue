<template>
<v-content class="login">
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <login-form></login-form>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>
