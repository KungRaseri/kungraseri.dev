import { IEntity } from "./IEntity";

export interface IUser extends IEntity {
    user_id: string;
    email: string;
    username: string;
    verified: boolean;
    locale: string;
    picture: string;
    nickname: string;
    identities: IIdentity[];
}

export interface IIdentity {
    provider: string;
    user_id: string;
    connection: string;
    isSocial: boolean;
}

export interface IProfileState {
    token: string;
    User: IUser | undefined;
}
