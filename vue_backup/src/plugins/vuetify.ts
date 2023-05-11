import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';

const options = {
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        primary: colors.deepPurple.base,
        secondary: colors.amber.base,
        accent: colors.blue.base,
        error: colors.red.base,
        info: colors.lightBlue.base,
        success: colors.green.lighten2,
        warning: colors.yellow.lighten2,
      },
    },
  },
};

Vue.use(Vuetify, {
  icons: {
    iconfont: 'mdi',
  },
});

export default new Vuetify(options);
