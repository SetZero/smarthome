import { RoomsState, RoomState } from "../states/RoomStates";

export type Action = {type: "ADD_ROOM", payload: RoomState};

export const addRoom = (room: RoomState): Action => ({
    type: "ADD_ROOM",
    payload: room
});