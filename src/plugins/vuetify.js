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
  VCheckbox,
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
    VCheckbox,
    transitions
  },
  directives: {
    Ripple
  },
  theme: {
    primary: colors.deepPurple.base,
    secondary: colors.deepOrange.base,
    accent: colors.deepOrange.darken2,
    error: "#D32F2F",
    warning: "#FDD835",
    info: "#1E88E5",
    success: "#43A047"
  },
})