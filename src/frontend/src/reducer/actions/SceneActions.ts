import { ScenesState, SceneState } from "../states/SceneStates";

export type Action = {type: "ADD_SCENE", payload: SceneState};

export const addScene = (scene: SceneState): Action => ({
    type: "ADD_SCENE",
    payload: scene
});