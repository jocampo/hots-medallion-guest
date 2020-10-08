// TODO: Protocol buffers should replace these eventually... We really shouldn't have to define these things in BOTH places
export enum MessageTypes {
    BOOK_ROOM = 'bookRoom',
    JOIN_ROOM = 'joinRoom',
    LEAVE_ROOM = 'leaveRoom',
    USER_JOINED_ROOM = 'userJoinedRoom',
    USER_LEFT_ROOM = 'userLeftRoom',
    ERROR_OCCURRED = 'errorOccurred',
    ADD_HERO = 'addHero',
    REMOVE_HERO = 'removeHero',
    HERO_ADDED = 'heroAdded',
    HERO_REMOVED = 'heroRemoved',
    MEDALLION_USED = 'medallionUsed',
    MEDALLION_OFF_CD = 'medallionOffCD',
    CANCEL_MEDALLION = 'cancelMedallion',
}

export interface WsPayload {
    msgType: MessageTypes;
    data;
}
