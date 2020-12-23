import Vue from 'vue';
import axios from 'axios';
import ICredentials from '@/interfaces/ICredentials';
import IAccount from '@/interfaces/IAccount';
import IToken from '@/interfaces/IToken';
import * as signalR from '@microsoft/signalr';
import * as ApplicationSettings from '../../appsettings.json';
import ISettings from '@/interfaces/ISettings';

const appSettingsJson: any = ApplicationSettings;
const appSettings: ISettings = appSettingsJson.default[0];

Object.defineProperty(Vue.prototype, '$signalR', { value: signalR });
Object.defineProperty(Vue.prototype, '$settings', { value: appSettings });

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

const ApiService = {
    Auth: {
        Login(credentials: ICredentials) {
            return new Promise((resolve, reject) => {
                const data = new FormData();

                data.append('email', credentials.email);
                data.append('password', credentials.password);

                axios
                    .post(`auth/token`, data)
                    .then((response) => {
                        resolve(response);
                    }).catch((response) => {
                        reject(response);
                    });
            });
        },
        Register(credentials: ICredentials) {
            return new Promise((resolve, reject) => {
                const data = new FormData();

                data.append('email', credentials.email);
                data.append('password', credentials.password);

                axios
                    .post(`auth/register`, data)
                    .then((response) => {
                        resolve(response);
                    }).catch((response) => {
                        reject(response);
                    });
            });
        },
        Authentication(provider: object, credentials: ICredentials) {
            return new Promise((resolve, reject) => {
                const data = new FormData();

                data.append('email', credentials.email);
                data.append('password', credentials.password);

                axios
                    .get(`auth/token`, { data })
                    .then((response) => {
                        resolve(response);
                    }).catch((response) => {
                        reject(response);
                    });
            });
        },
    },
    Account: {
        Get() {
            return new Promise((resolve, reject) => {
                axios
                    .get('account')
                    .then((response) => {
                        resolve(response);
                    }).catch((response) => {
                        reject(response);
                    });
            });
        },
        Post(account: IAccount) {
            return new Promise((resolve, reject) => {
                const data = new FormData();

                data.append('account', JSON.stringify(account));

                axios
                    .post('account', account)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((response) => {
                        reject(response);
                    });
            });
        },
    },
    StreamElements: {
        GetTopPoints() {
            return new Promise((resolve, reject) => {
                axios
                    .get('se/points/top')
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((response) => {
                        reject(response);
                    });
            });
        },
        GetTopAlltimePoints() {
            return new Promise((resolve, reject) => {
                axios
                    .get('se/points/top/alltime')
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((response) => {
                        reject(response);
                    });
            });
        },
    },
};

Vue.prototype.$api = ApiService;