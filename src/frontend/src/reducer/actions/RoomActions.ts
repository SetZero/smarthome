import { ItemRef, RoomsState, RoomState } from "../states/RoomStates";

export interface ItemRefRoom {
    ref: ItemRef;
    roomName: string
}

export type Action = {type: "ADD_ROOM"|"REMOVE_ROOM", payload: RoomState};
export type ItemRefAction = {type: "ADD_ITEM"|"REMOVE_ITEM", payload: ItemRefRoom}

export const addRoom = (room: RoomState): Action => ({
    type: "ADD_ROOM",
    payload: room
});
export const removeRoom = (room: RoomState): Action => ({
    type: "REMOVE_ROOM",
    payload: room
});

export const addItemToRoom = (itemRef: ItemRef, room: string): ItemRefAction => ({
    type: "ADD_ITEM",
    payload: {ref: itemRef, roomName: room}
});

export const removeItemToRoom = (itemRef: ItemRef, room: string): ItemRefAction => ({
    type: "REMOVE_ITEM",
    payload: {ref: itemRef, roomName: room}
});