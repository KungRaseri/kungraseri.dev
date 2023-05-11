import auth0, { AuthorizeOptions, Management } from "auth0-js";
import { EventEmitter } from "events";
const authConfig = require("../../appsettings.json");

const loginEvent = "EVENT_LOGIN";
const logoutEvent = "EVENT_LOGOUT";

const auth0WebAuth = new auth0.WebAuth({
    domain: authConfig.domain,
    redirectUri: `${window.location.origin}/auth/external/callback`,
    clientID: authConfig.clientId,
    responseType: "token id_token",
    audience: authConfig.audience,
    scope: "openid profile email read:current_user",
});


export default class AuthService extends EventEmitter {
    public isAuthenticated: boolean = false;
    public manager: Management = new auth0.Management({
        domain: "",
        token: ""
    });

    private accessToken: any = null;

    constructor() {
        super();
    }

    public login(customState: AuthorizeOptions) {
        auth0WebAuth.authorize(customState);
    }

    public handleAuthentication() {
        return new Promise((resolve: any, reject: any) => {
            auth0WebAuth.parseHash((err: any, authResult: any) => {
                if (err) { reject(err); } else {

                    this.localLogin(authResult);
                    resolve(authResult);
                }
            });
        });
    }

    public localLogin(authResult: any) {
        this.accessToken = authResult.accessToken;
        this.isAuthenticated = true;

        this.manager = new auth0.Management({
            domain: authConfig.domain,
            token: authResult.accessToken
        });

        this.manager.getUser(authResult.idTokenPayload.sub, (err: any, user: any) => {
            if (err) { return console.log(err); }

            this.emit(loginEvent, {
                loggedIn: true,
                token: this.accessToken,
                profile: user,
                state: authResult.appState || {},
            });
        });

    }

    public renewToken(isAuthenticated: boolean) {
        return new Promise((resolve: any, reject: any) => {
            if (!isAuthenticated) {
                reject("User not authenticated");
            }

            auth0WebAuth.checkSession({
                audience: authConfig.audience,
                scope: "read:current_user"
            }, (err: any, authResult: any) => {
                if (err) { reject(err); } else {
                    this.localLogin(authResult);
                    resolve(authResult);
                }
            });
        });
    }

    public logout() {
        this.isAuthenticated = false;

        auth0WebAuth.logout({
            returnTo: window.location.origin,
        });

        this.emit(logoutEvent);
    }
}
