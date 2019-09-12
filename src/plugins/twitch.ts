import Vue from 'vue';
import axios from 'axios';
import * as ApplicationSettings from '@/ApplicationSettings.json';
import ITwitchOAuthConfig from '@/interfaces/ITwitchOAuthConfig';
import ISettings from '@/interfaces/ISettings';

const appSettingsJson: any = ApplicationSettings;
const appSettings: ISettings = appSettingsJson.default[0];

axios.defaults.baseURL = appSettings.ApiUrl;
axios.interceptors.request.use((config) => {
  const dashboardStore = localStorage.getItem('dashboard') || '{}';
  const token = JSON.parse(dashboardStore).token;
  if (token) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const TwitchApi = {
  Twitch: {
    AuthSettings: {
      access_token: '',
      scope: '',
      token_type: '',
    },
    GetSettings(applicationKey: string) {
      return new Promise((resolve, reject) => {
        const data = new FormData();

        data.append('apiKey', applicationKey);

        axios
          .post(`settings/twitch`, data)
          .then((response) => {
            resolve(response);
          }).catch((response) => {
            reject(response);
          });
      });
    },
  },
}

Vue.prototype.$twitchApi = TwitchApi;