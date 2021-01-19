import { Action, ItemRefAction } from "../actions/RoomActions";
import { ApiService } from "../../Utils/ApiService";
import { Reducer } from "redux";


export enum RoomCardSize {
    SMALL = 1,
    MEDIUM = 2,
    LARGE = 3
}

export interface ItemRef {
    link: string;
}

export interface RoomState {
    name: string;
    url: string;
    cardSize: RoomCardSize;
    sensors?: Array<ItemRef>;
}

export interface RoomsState {
    rooms: RoomState[]
}

export let roomsReducer = async () => {
    return new Promise<Reducer<any, Action>>((resolve, reject) => {
        ApiService.GetAllRooms().then((readState: any) => {
            const reducer = (state: RoomsState = readState, action: Action|ItemRefAction) => {
                console.log("Current state" + JSON.stringify(state));
                switch (action.type) {
                    case "ADD_ROOM": {
                        return { ...state, rooms: [...state.rooms, action.payload] };
                    }
                    case "REMOVE_ROOM": {
                        let newRooms = state.rooms.filter(e => e.name !== action.payload.name);
                        state.rooms = newRooms;
                        return {...state, rooms: newRooms};
                    }
                    case "ADD_ITEM": {
                        let ref = action.payload.ref.link;
                        state.rooms.find(e => e.name === action.payload.roomName)?.sensors?.push({link: ref})
                        return { ... state, rooms: state.rooms};
                    }
                    case "REMOVE_ITEM": {
                        let ref = action.payload.ref.link;
                        let selectedRoom = state.rooms.findIndex(e => e.name === action.payload.roomName);
                        if(selectedRoom != undefined && state.rooms[selectedRoom] != undefined && state.rooms[selectedRoom].sensors != undefined) {
                            state.rooms.splice(selectedRoom, 1)
                        }
                        return {... state, rooms: state.rooms};
                    }
                    default:
                        return state;
                }
            }
            resolve(reducer);
        }).catch((e) => {
            console.log(e);
            reject("Unable to convert room result to JSON")
        })
    });
};