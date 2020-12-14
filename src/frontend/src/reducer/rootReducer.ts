import { combineReducers } from "redux";

import { roomsReducer, RoomsState } from "./states/RoomStates";
import { scenesReducer, ScenesState } from "./states/SceneStates";

export interface StateType {
    roomsReducer: RoomsState
    itemsReducer: ItemList
    scenesReducer : ScenesState
}

export const rootReducer = async () => {
    const itemsReducer = await itemReducer();
    return combineReducers({ roomsReducer, itemsReducer });
};
