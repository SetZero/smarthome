import { ScenesState, SceneState } from "../states/SceneStates";

export type Action = {type: "ADD_ROOM", payload: SceneState};

export const addRoom = (room: SceneState): Action => ({
    type: "ADD_ROOM",
    payload: room
});