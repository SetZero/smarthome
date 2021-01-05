import { Action } from "../actions/RoomActions";
import { ApiService } from "../../Utils/ApiService";
import { rejects } from "assert";
import { Reducer } from "redux";
import { Url } from "url";
import { act } from "react-dom/test-utils";

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
    url: string;
    cardSize: RoomCardSize;
    sensors?: Array<Sensors>;
}

export interface RoomsState {
    rooms: RoomState[]
}

const initialState = {
    rooms: [
        { name: "Bad", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Küche", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.SMALL, sensors: [] },
        { name: "Wohnzimmer", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg", cardSize: RoomCardSize.MEDIUM, sensors: [{ name: "Temperature", value: "23.5°C" }] },
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
            if (readState === undefined) {
                readState = {};
            }
            if (readState.rooms === undefined) {
                readState.rooms = [];
            }
            const reducer = (state: RoomsState = readState, action: Action) => {
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
                        return state;
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