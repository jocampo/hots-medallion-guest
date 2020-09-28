import { Map } from 'immutable';

// TODO: Eventually replace these with compiled protobuff references
// Same goes for the b/e. Then we can use them also in the request/response types
// and the serialization.
// Such classes will also help encapsulate basic field validations and prevent us
// from repeating that logic on both ends (f/e, b/e).
export interface User {
    id: string;
    name: string;
}

export interface Hero {
    name: string;
    short_name: string;
    role: string;
    type: string;
    icon_url: Map<string, string>;
}

export enum Teams {
    BLUE = 'blue',
    RED = 'red',
}

export interface Room {
    code: string;
    users: Array<User>;
    ownerId: number;
    redTeam: Array<Hero>;
    blueTeam: Array<Hero>;
}
