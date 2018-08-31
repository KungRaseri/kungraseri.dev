import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VCard,
  VForm,
  VTooltip,
  VTextField,
  VToolbar,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'
// eslint-disable-next-line
import colors from 'vuetify/es5/util/colors'
import {
  Ripple
} from 'vuetify/es5/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VCard,
    VTooltip,
    VToolbar,
    VForm,
    VTextField,
    transitions
  },
  directives: {
    Ripple
  },
  theme: {
    primary: "#673AB7",
    secondary: "#9575CD",
    accent: "#9c27b0",
    error: "#D32F2F",
    warning: "#FDD835",
    info: "#1E88E5",
    success: "#43A047"
  },
})