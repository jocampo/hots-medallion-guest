import { List } from 'immutable';
import { Hero, Room, Teams, User } from '../entities/types';
import { ActionTypes, BaseFSAAction } from './actions';

export const ActionCreators = {
    setUserName: (userName: string): BaseFSAAction => ({
        type: ActionTypes.SET_USER_NAME,
        payload: userName,
    }),
    setUser: (user: User): BaseFSAAction => ({
        type: ActionTypes.SET_USER,
        payload: user,
    }),
    joinRoom: (room: Room): BaseFSAAction => ({
        type: ActionTypes.JOIN_ROOM,
        payload: room,
    }),
    leaveRoom: (): BaseFSAAction => ({
        type: ActionTypes.LEAVE_ROOM,
        payload: null,
    }),
    userJoinedRoom: (user: User, room: Room): BaseFSAAction => ({
        type: ActionTypes.USER_JOINED_ROOM,
        payload: {
            user,
            room,
        },
    }),
    userLeftRoom: (user: User): BaseFSAAction => ({
        type: ActionTypes.USER_LEFT_ROOM,
        payload: user,
    }),
    setHeroPool: (heroes: List<Hero>): BaseFSAAction => ({
        type: ActionTypes.SET_HERO_POOL,
        payload: heroes,
    }),
    addHero: (hero: Hero, team: Teams): BaseFSAAction => ({
        type: ActionTypes.ADD_HERO,
        payload: {
            hero,
            team,
        },
    }),
    removeHero: (hero: Hero, team: Teams): BaseFSAAction => ({
        type: ActionTypes.REMOVE_HERO,
        payload: {
            hero,
            team,
        },
    }),
    // TODO: We might have to track the medallions somehow in the store
    medallionUsed: (hero: Hero, team: Teams): BaseFSAAction => ({
        type: ActionTypes.MEDALLION_USED,
        payload: {
            hero,
            team,
        },
    }),
    medallionOffCD: (hero: Hero, team: Teams): BaseFSAAction => ({
        type: ActionTypes.MEDALLION_OFF_CD,
        payload: {
            hero,
            team,
        },
    }),
    cancelMedallion: (hero: Hero, team: Teams): BaseFSAAction => ({
        type: ActionTypes.CANCEL_MEDALLION,
        payload: {
            hero,
            team,
        },
    }),
};
