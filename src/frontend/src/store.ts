import { createStore } from "redux"
import { roomsReducer } from "./views/states/RoomStates"


export const store = createStore(roomsReducer)