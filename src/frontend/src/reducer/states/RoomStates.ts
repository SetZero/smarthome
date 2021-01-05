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
    sensors?: Array<Sensors>;
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

// TODO: Add events ADD_ITEM_TO_ROOM and REMOVE_ITEM_FROM_ROOM (include item)
// TODO: Fix returned state
export const roomsReducer = (state: RoomsState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_ROOM": {
            console.log(state)
            return { ...state, rooms: [...state.rooms, action.payload] };
        }
        case "REMOVE_ROOM": {
            let newRooms = state.rooms.filter(e => e.name !== action.payload.name);
            state.rooms = newRooms;
            return {...state, rooms: newRooms};
        }
        case "ADD_ITEM": {
            return state;
        }
        default:
            return state;
    }
}