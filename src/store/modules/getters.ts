import { GetterTree } from 'vuex';
import { State } from '@/interfaces/State';
import { IProfileState } from '@/interfaces/IUser';

export const getters: GetterTree<IProfileState, State> = {
    token: (state: any) => state.token,
    tokenData: (state: any, getters: any) => state.token ? JSON.parse(atob(getters.token.split('.')[1])) : null,
    tokenSubject: (state: any, getters: any) => getters.tokenData ? getters.tokenData.sub : null,
    tokenIssuer: (state: any, getters: any) => getters.tokenData ? getters.tokenData.iss : null,
    User: (state: any) => state.User,
    isAuthenticated: (state: any, getters: any) => getters.tokenData ? true : false,
};
