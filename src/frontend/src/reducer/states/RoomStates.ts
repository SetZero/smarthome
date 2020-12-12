import { Action } from "../actions/RoomActions";

export enum RoomCardSize {
    SMALL = 1,
    MEDIUM = 2,
    LARGE = 3
}

export interface Sensors {
    name: string;
    value: string;
}

export interface RoomState {
    name: string;
    icon: string;
    cardSize: RoomCardSize;
    sensors: Array<Sensors> | undefined
}

export interface RoomsState {
    rooms: RoomState[]
}

const initialState = {
    rooms: [
        { name: "Bad", icon: "BathtubIcon", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Küche", icon: "KitchenIcon", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Wohnzimmer", icon: "WeekendIcon", cardSize: RoomCardSize.MEDIUM, sensors: [{ name: "Temperature", value: "23.5°C" }] },
        { name: "Briefkasten", icon: "WeekendIcon", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Büro", icon: "WeekendIcon", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Schlafzimmer", icon: "WeekendIcon", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Garage", icon: "WeekendIcon", cardSize: RoomCardSize.SMALL, sensors: [] }
    ]
};

export const roomsReducer = (state: RoomsState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_ROOM": {
            return { ...state, rooms: [...state.rooms, action.payload] };
        }
        default:
            return state;
    }
}