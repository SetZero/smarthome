import { combineReducers } from "redux";

import { roomsReducer, RoomsState } from "./states/RoomStates";

export interface StateType {
    roomsReducer: RoomsState
}
export const rootReducer = combineReducers({roomsReducer});