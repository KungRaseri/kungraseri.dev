<template>
<v-content class="register">
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <register-form></register-form>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "Register",
  components: {
    RegisterForm
  }
};
</script>
