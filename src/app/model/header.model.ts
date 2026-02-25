export interface HeaderModel {
    user: UsersEnum;
    list: KnownUnknownEnum;
}

export enum KnownUnknownEnum {
    KNOWN = 'A2:B999',
    UNKNOWN = 'C2:D999'
}

export enum UsersEnum {
    GABI = 'Gabi',
    TOMI = 'Tomi'
}
