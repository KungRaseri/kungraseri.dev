import { MutationTree } from "vuex";
import { IUser, IProfileState } from "@/interfaces/IUser";

export const mutations: MutationTree<IProfileState> = {
    setToken(state, token: any) {
        state.token = token;
    },
    setUser(state, user: IUser) {
        state.User = user;
    }
};
