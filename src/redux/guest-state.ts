import { Hero, Room, User } from '../entities/types';

export interface GuestStateI {
    room: Room | null;
    user: User | null;
    heroes: Array<Hero>;
}

export default class GuestState implements GuestStateI {
    readonly room: Room | null = null;
    readonly user: User | null = null;
    readonly heroes: Array<Hero> = [];

    constructor(room: Room | null, user: User | null, heroes: Array<Hero>) {
        this.room = room;
        this.user = user;
        this.heroes = heroes;
    }
}
