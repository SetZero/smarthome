import { combineReducers } from "redux";

import { roomsReducer, RoomsState } from "./states/RoomStates";
import { itemReducer, ItemList } from "./states/ItemState";

export interface StateType {
    roomsReducer: RoomsState
    itemsReducer: ItemList
}

export const rootReducer = async () => {
    const itemsReducer = await itemReducer();
    return combineReducers({ roomsReducer, itemsReducer });
};
