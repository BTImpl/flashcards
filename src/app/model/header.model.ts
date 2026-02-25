
export interface ListType {
    id: ListTypeEnum;
    range: string;
    labelKey: string;
    iconClass: string;
}

export enum ListTypeEnum {
    KNOWN = 'KNOWN',
    UNKNOWN = 'UNKNOWN'
}

export const LIST_TYPES: { [key in ListTypeEnum]: ListType } = {
    [ListTypeEnum.KNOWN]: {
        id: ListTypeEnum.KNOWN,
        range: 'A2:B999',
        labelKey: 'label.known',
        iconClass: 'fa-check'
    },
    [ListTypeEnum.UNKNOWN]: {
        id: ListTypeEnum.UNKNOWN,
        range: 'C2:D999',
        labelKey: 'label.unknown',
        iconClass: 'fa-exclamation'
    }
};

export enum UsersEnum {
    GABI = 'Gabi',
    TOMI = 'Tomi'
}
