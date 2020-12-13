import { combineReducers } from "redux";

import { roomsReducer, RoomsState } from "./states/RoomStates";
import { itemReducer } from "./states/ItemState";

export interface StateType {
    roomsReducer: RoomsState
}

export const rootReducer = async () => {
    const itemResult = await itemReducer();
    return combineReducers({ roomsReducer, itemResult });
};
