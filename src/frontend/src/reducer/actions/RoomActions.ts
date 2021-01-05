import { RoomsState, RoomState } from "../states/RoomStates";

export type Action = {type: "ADD_ROOM"|"REMOVE_ROOM"|"ADD_ITEM", payload: RoomState};

export const addRoom = (room: RoomState): Action => ({
    type: "ADD_ROOM",
    payload: room
});
export const removeRoom = (room: RoomState): Action => ({
    type: "REMOVE_ROOM",
    payload: room
});

export const addItem = (room: RoomState): Action => ({
    type: "ADD_ITEM",
    payload: room
});