import GuestState from './guest-state';

export const roomStateReducer = (roomState = new GuestState(null, null, []), action: any) => {
    // Nothing here for now
    return roomState;
};
