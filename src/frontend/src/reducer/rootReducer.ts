import { combineReducers } from "redux";

import { roomsReducer, RoomsState } from "./states/RoomStates";
import { scenesReducer, ScenesState } from "./states/SceneStates";

export interface StateType {
    roomsReducer: RoomsState
    scenesReducer : ScenesState
}
export const rootReducer = combineReducers({roomsReducer, scenesReducer});