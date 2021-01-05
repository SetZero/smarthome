import { ScenesState, SceneState } from "../states/SceneStates";

export type Action = {type: "ADD_SCENE"|"REMOVE_SCENE"|"CHANGE_SCENE", payload: SceneState, scene2?:SceneState};

export const addScene = (scene: SceneState): Action => ({
    type: "ADD_SCENE",
    payload: scene
});
export const removeScene = (scene: SceneState): Action => ({
    type: "REMOVE_SCENE",
    payload: scene
});
export const changeScene = (scene: SceneState, sceneTwo:SceneState): Action => ({
    type: "CHANGE_SCENE",
    payload: scene,
    scene2:sceneTwo
});
