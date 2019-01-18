import Vue from 'vue';
import * as SignalR from '@aspnet/signalr';

declare module 'vue/types/vue' {
  interface Vue {
    $SignalR: any;
  }
}
