import AuthService from "@/services/authService";

export default {
  install(Vue: any) {
    Vue.prototype.$auth = new AuthService();

    Vue.mixin({
      created() {
        if (this.handleLoginEvent) {
          Vue.prototype.$auth.addListener("EVENT_LOGIN", this.handleLoginEvent);
        }
      },

      destroyed() {
        if (this.handleLoginEvent) {
          Vue.prototype.$auth.removeListener("EVENT_LOGIN", this.handleLoginEvent);
        }
      },
    });
  },
};
