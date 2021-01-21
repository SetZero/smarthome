import { Action, ItemRefAction } from "../actions/RoomActions";
import { Item } from "../states/ItemState"
import { ApiService } from "../../Utils/ApiService";
import { Reducer } from "redux";
import arrayMove from "array-move";


export enum RoomCardSize {
    SMALL = 1,
    MEDIUM = 2,
    LARGE = 3
}

export interface ItemRef {
    link: string;
}

export interface RoomItemAction {
    item: Item;
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
            const reducer = (state: RoomsState = readState, action: Action | ItemRefAction) => {
                // console.log("Current state" + JSON.stringify(state));
                switch (action.type) {
                    case "ADD_ROOM": {
                        return { ...state, rooms: [...state.rooms, action.payload] };
                    }
                    case "REMOVE_ROOM": {
                        let newRooms = state.rooms.filter(e => e.name !== action.payload.name);
                        state.rooms = newRooms;
                        return { ...state, rooms: newRooms };
                    }
                    case "UPDATE_ROOM": {
                        let newRooms = Array.from(state.rooms);
                        let selectedRoomIndex = newRooms.findIndex(e => e.name === action.payload.name);
                        if (selectedRoomIndex != undefined && newRooms[selectedRoomIndex].sensors != undefined
                            && action.room2 != undefined) {
                            newRooms[selectedRoomIndex].name = action.room2.name;
                            newRooms[selectedRoomIndex].url = action.room2.url;
                        }

                        return { ...state, rooms: newRooms };
                    }
                    case "ADD_ITEM": {
                        let ref = action.payload.ref.link;
                        state.rooms.find(e => e.name === action.payload.roomName)?.sensors?.push({ link: ref })
                        return { ...state, rooms: state.rooms };
                    }
                    case "REMOVE_ITEM": {
                        let ref = action.payload.ref.link;
                        let newRooms = Array.from(state.rooms);
                        let selectedRoomIndex = newRooms.findIndex(e => e.name === action.payload.roomName);
                        if (selectedRoomIndex != undefined && newRooms[selectedRoomIndex].sensors != undefined) {
                            newRooms[selectedRoomIndex].sensors = newRooms[selectedRoomIndex]?.sensors?.filter(e => e.link != ref);
                        }
                        return { ...state, rooms: newRooms };
                    }
                    case "MOVE_ROOM_UP": {
                        let index = state.rooms.findIndex(e => e.name === action.payload.name);
                        let newRooms = arrayMove(state.rooms, index, index - 1);
                        return { ...state, rooms: newRooms };
                    }
                    case "MOVE_ROOM_DOWN": {
                        let index = state.rooms.findIndex(e => e.name === action.payload.name);
                        let newRooms = arrayMove(state.rooms, index, index + 1);
                        return { ...state, rooms: newRooms };
                    }
                    default: {
                        return { ...state };
                    }
                }
            }
            resolve(reducer);
        }).catch((e) => {
            console.log(e);
            reject("Unable to convert room result to JSON")
        })
    });
};