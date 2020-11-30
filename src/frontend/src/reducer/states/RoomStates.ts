export interface RoomState {
    name: string;
    icon: string;
}

export interface RoomsState {
    rooms: RoomState[]
}

const initialState = {
    rooms: [
        { name: "Bad", icon: "BathtubIcon" },
        { name: "Küche", icon: "KitchenIcon" },
        { name: "Wohnzimmer", icon: "WeekendIcon" },
        { name: "Briefkasten", icon: "WeekendIcon" },
        { name: "Büro", icon: "WeekendIcon" },
        { name: "Schlafzimmer", icon: "WeekendIcon" },
        { name: "Garage", icon: "WeekendIcon" }
    ]
}

type Action = {type: "ADD_ROOM", payload: RoomState}

export const roomsReducer = (state: RoomsState  = initialState, action: Action) => {
    switch(action.type) {
        case "ADD_ROOM": {
            return {...state, notes: [...state.rooms, action.payload]};
        }
        default:
            return state;
    }
}