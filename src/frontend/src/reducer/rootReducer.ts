import { combineReducers } from "redux";
import { ItemList, itemReducer } from "./states/ItemState";
import { ActionList, actionReducer } from "./states/ActionStates";

import { roomsReducer, RoomsState } from "./states/RoomStates";
import { scenesReducer, ScenesState } from "./states/SceneStates";

export interface StateType {
    roomsReducer: RoomsState
    itemsReducer: ItemList
    actionsReducer: ActionList
    scenesReducer : ScenesState
}

export const rootReducer = async () => {
    const itemsReducer = await itemReducer();
    const actionsReducerAwaited = await actionReducer();
    const roomsReducerAwaited = await roomsReducer();
    const scenesReducerAwaited = await scenesReducer();
    return combineReducers({ 
        roomsReducer : roomsReducerAwaited,
        itemsReducer: itemsReducer,
        actionsReducer: actionsReducerAwaited,
        scenesReducer: scenesReducerAwaited });
};
