import { Module } from 'vuex';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import { State } from '@/interfaces/State';
import { IProfileState } from '@/interfaces/IUser';

export const state: IProfileState = {
    token: '',
    User: undefined,
};

export const UserProfile: Module<IProfileState, State> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
