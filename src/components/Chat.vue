<template>
  <v-layout row align-center text-md-center wrap>
    <v-flex xs12 sm6>
      <v-card>
        <v-toolbar></v-toolbar>
        <v-list>
          <template v-for="(message, index) in messages">
            <v-list-tile-content v-bind:key="index">{{message}}</v-list-tile-content>
          </template>
        </v-list>
        <v-text-field v-model="message"></v-text-field>
        <v-card-actions>
          <button @click="onSendMessage(connection, message)" id="SendMessage">Test</button>
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
      connection: null,
      message: "",
      messages: []
    };
  },
  created() {
    this.connection = new this.$signalR.HubConnectionBuilder()
      .withUrl("http://localhost:57463/ws/api/chat")
      .build();
  },
  mounted() {
    this.connection.start().catch(function(err) {
      return console.error(err.toString());
    });

    this.connection.on("ReceiveMessage", (user, message) => {
      console.log(user, message);
      this.messages.push(`${user}: ${message}`);
    });
    console.log("test", this.$api.Twitch.AuthSettings);
  },
  methods: {
    onSendMessage: (connection, message) => {
      connection.invoke("SendMessage", "client", message).catch(err => {
        return console.error(error.toString());
      });
    }
  }
};
</script>
