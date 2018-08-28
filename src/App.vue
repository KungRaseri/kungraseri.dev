<template>
<v-app dark>
    <v-navigation-drawer v-if="isAuthenticated" v-model="drawer" clipped app>
        <v-list>
            <v-list-tile value="true" v-for="(item, i) in sideNavItems" :key="i" @click="$router.push(item.route)">
                <v-list-tile-action>
                    <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
        <v-toolbar-side-icon v-if="isAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-for="(item, i) in toolbarItems" :key="i" @click="$router.push(item.route)">
            <v-btn v-if="isAuthenticated === item.requiresAuth" flat v-text="item.title"></v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <v-content>
        <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
        <span>&copy; 2018</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isAuthenticated: this.$store.getters.isAuthenticated,
      drawer: true,
      clipped: true,
      fixed: true,
      toolbarItems: [
        {
          icon: "dashboard",
          title: "Dashboard",
          route: "dashboard",
          requiresAuth: true
        },
        {
          icon: "assignment",
          title: "Register",
          route: "register",
          requiresAuth: false
        },
        {
          icon: "fingerprint",
          title: "Login",
          route: "login",
          requiresAuth: false
        }
      ],
      sideNavItems: [],
      title: "Community Dashboard"
    };
  }
};
</script>
