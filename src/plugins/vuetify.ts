import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

import 'vuetify/src/stylus/app.styl';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';


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
  icons: {
    iconfont: 'mdi || fa || md',
  },
});

