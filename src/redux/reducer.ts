import { AnyAction } from 'redux';
import { Room, User } from '../entities/types';
import { ActionTypes } from './actions';
import GuestState from './guest-state';

export const roomStateReducer = (
    roomState = new GuestState(null, null, []),
    action: AnyAction,
): GuestState => {
    switch (action.type) {
        case ActionTypes.USER_JOINED_ROOM:
            const user: User = action.payload?.user;
            const room: Room = action.payload?.room;
            if (roomState.room !== null) {
                // Another user joined the room
                return new GuestState(room, roomState.user, roomState.heroes);
            } else {
                // This user is joining a room
                return new GuestState(room, user, []);
            }
            break;
    }
    return roomState;
};
