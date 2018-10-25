import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:57463/api/v1/';
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

export interface Credentials {
    email: string;
    password: string;
}

export interface Account {
    username: string;
    email: string;
    password: string;
    passwordSalt: string;
    twitchBotSettings: object;
    discordBotSettings: object;
    viewers: any[];
    viewerRanks: any[];
}

export interface Token {
    value: string;
    accountId: string;
    expiration: string;
    issued: string;
}

const ApiService = {
    Auth: {
        Login(credentials: Credentials) {
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
        Register(credentials: Credentials) {
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
        Authentication(provider: object, credentials: Credentials) {
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
        Post(account: Account) {
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

export default ApiService;

Vue.prototype.$api = ApiService;
