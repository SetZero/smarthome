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

export const roomsReducer = (state: RoomsState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_ROOM": {
            console.log(state)
            return { ...state, rooms: [...state.rooms, action.payload] };
        }
        case "REMOVE_ROOM": {
            let tempState= JSON.parse(JSON.stringify(state));
            console.log("RemoveRoom",state)
            console.log(action.payload.name)
            var found = false;
            for(var i =0; i<tempState.rooms.length;i++){
                if(tempState.rooms[i].name ==action.payload.name){
                    found =true;
                    continue;
                }
                if(found ==true)    
                    tempState.rooms[i-1] = tempState.rooms[i];
            }
            tempState.rooms.pop();
            console.log("TempStat: ",tempState);
            console.log("rooms: ",state.rooms)
            return { ...state, ...tempState };
        }
        default:
            return state;
    }
}