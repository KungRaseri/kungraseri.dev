import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  theme: {
    primary: colors.deepPurple,
    secondary: colors.amber,
    accent: colors.blue,
    error: colors.red,
    info: colors.lightBlue,
    success: colors.green.lighten2,
    warning: colors.yellow.lighten2,
  },
  customProperties: true,
  iconfont: 'md',
});
