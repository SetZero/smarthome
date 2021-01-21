import { ItemRef, RoomState } from "../states/RoomStates";

export interface ItemRefRoom {
    ref: ItemRef;
    roomName: string
}

export enum RoomDirection {
    UP = "MOVE_ROOM_UP",
    DOWN = "MOVE_ROOM_DOWN"
}

export type Action = {type: "ADD_ROOM"|"REMOVE_ROOM"|"UPDATE_ROOM"|"MOVE_ROOM_UP"|"MOVE_ROOM_DOWN", payload: RoomState, room2?: RoomState};
export type ItemRefAction = {type: "ADD_ITEM"|"REMOVE_ITEM", payload: ItemRefRoom}

export const addRoom = (room: RoomState): Action => ({
    type: "ADD_ROOM",
    payload: room
});
export const removeRoom = (room: RoomState): Action => ({
    type: "REMOVE_ROOM",
    payload: room
});

export const changeRoomOrder = (room: RoomState, direction: RoomDirection): Action => ({
    type: (direction as ("MOVE_ROOM_UP"|"MOVE_ROOM_DOWN")),
    payload: room
});

export const addItemToRoom = (itemRef: ItemRef, room: string): ItemRefAction => ({
    type: "ADD_ITEM",
    payload: {ref: itemRef, roomName: room}
});

export const removeItemFromRoom = (itemRef: ItemRef, room: string): ItemRefAction => ({
    type: "REMOVE_ITEM",
    payload: {ref: itemRef, roomName: room}
});

export const updateRoom = (room: RoomState, newRoom : RoomState): Action => ({
    type: "UPDATE_ROOM",
    payload: room,
    room2: newRoom
})