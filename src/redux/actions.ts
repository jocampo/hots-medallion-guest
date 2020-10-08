// TODO: Eventually might want to take a couple of things from
// https://github.com/piotrwitek/react-redux-typescript-guide#redux---typing-patterns
// but for now we'll just go for quick and dirty
export interface BaseFSAAction {
    type: string;
    payload;
}

// As to what each one of these actions requires in the payload, it's up to the reducer to validate 🤔
// Talk about a shitty developer experience. TODO: Obv address this, find a way where that doesn't mean a
// billion interfaces
export enum ActionTypes {
    /* Actions taken by this user */
    SET_USER_NAME = 'SET_USER_NAME', // Before joining the room, we can only set our userName (no id)
    SET_USER = 'SET_USER', // We set the whole user object once we successfully connect to the room (confirmed by server)
    JOIN_ROOM = 'JOIN_ROOM', // This action sets the whole Room (includes other Users, Heroes per team)
    LEAVE_ROOM = 'LEAVE_ROOM',

    /* Actions taken by other users in the room (synced to us through the WS) */
    USER_JOINED_ROOM = 'USER_JOINED_ROOM',
    USER_LEFT_ROOM = 'USER_JOINED_ROOM',

    /* Hero Actions */
    SET_HERO_POOL = 'SET_HERO_POOL',
    ADD_HERO = 'ADD_HERO',
    REMOVE_HERO = 'REMOVE_HERO',

    /* Medallion Actions */
    MEDALLION_USED = 'MEDALLION_USED',
    MEDALLION_OFF_CD = 'MEDALLION_OFF_CD',
    CANCEL_MEDALLION = 'CANCEL_MEDALLION',
}
