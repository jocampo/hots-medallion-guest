import { Hero, Room, User } from '../entities/types';

export interface IGuestState {
    room: Room | null;
    user: User | null;
    heroes: Array<Hero>;
}

export default class GuestState implements IGuestState {
    public room: Room | null = null;
    public user: User | null = null;
    public heroes: Array<Hero> = [];

    constructor(room: Room | null, user: User | null, heroes: Array<Hero>) {
        this.room = room;
        this.user = user;
        this.heroes = heroes;
    }
}
