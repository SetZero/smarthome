import { combineReducers } from "redux";
import { ItemList, itemReducer } from "./states/ItemState";

import { roomsReducer, RoomsState } from "./states/RoomStates";
import { scenesReducer, ScenesState } from "./states/SceneStates";

export interface StateType {
    roomsReducer: RoomsState
    itemsReducer: ItemList
    scenesReducer : ScenesState
}

export const rootReducer = async () => {
    const itemsReducer = await itemReducer();
    const roomsReducerAwaited = await roomsReducer();
    const scenesReducerAwaited = await scenesReducer();
    return combineReducers({ 
        roomsReducer : roomsReducerAwaited,
        itemsReducer: itemsReducer,
        scenesReducer: scenesReducerAwaited });
};
