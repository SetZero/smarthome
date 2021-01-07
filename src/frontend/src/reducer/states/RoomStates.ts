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

const initialState = {
    rooms: [
        { name: "Bad", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Küche", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Wohnzimmer", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.MEDIUM, sensors: [{ link: "Temperature"}] },
        { name: "Briefkasten", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Büro", url: "https://www.dmjmaviation.com/wp-content/uploads/2018/05/caribbean-destination.jpg", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Schlafzimmer", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Garage", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] }
    ]
};

// TODO: Add events ADD_ITEM_TO_ROOM and REMOVE_ITEM_FROM_ROOM (include item)
// TODO: Fix returned state
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
                        let oldState = JSON.parse(JSON.stringify(state));
                        let ref = action.payload.ref.link;
                        state.rooms.find(e => e.name === action.payload.roomName)?.sensors?.push({link: ref})
                        return {oldState, rooms: state.rooms};
                    }
                    case "REMOVE_ITEM": {
                        let oldState = JSON.parse(JSON.stringify(state));
                        let ref = action.payload.ref.link;
                        let selectedRoom = state.rooms.find(e => e.name === action.payload.roomName);
                        if(selectedRoom && selectedRoom.sensors) {
                            selectedRoom.sensors = selectedRoom?.sensors?.filter(e => e.link !== ref);
                        }
                        return {oldState, rooms: state.rooms};
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