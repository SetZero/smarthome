import { ItemRef } from "../states/RoomStates";
import { ScenesState, SceneState, ItemAction } from "../states/SceneStates";

export type Action = {type: 
"ADD_SCENE"
|"REMOVE_SCENE"
|"CHANGE_SCENE" 
| "ADD_ACTION_TO_SCENE" 
| "ACTION_CHANGE_IN_SCENE" 
| "REMOVE_ACTION_FROM_SCENE" , payload: SceneState, scene2?:SceneState, action?: ItemAction };

export interface ItemRefScene {
    ref: ItemRef;
    sceneName: string
}

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

export const addActionToScene = ( scene: SceneState, action : ItemAction) : Action  => {
    return {
        type : "ADD_ACTION_TO_SCENE",
        payload : scene,
        action: action
    }
};

export const updateAction = (scene : SceneState, action : ItemAction) : Action => {
    return {
        type : "ACTION_CHANGE_IN_SCENE",
        payload : scene,
        action: action
    }
};

export const removeActionFromScene = (scene : SceneState, action : ItemAction) : Action => {
    return {
        type : "REMOVE_ACTION_FROM_SCENE",
        payload : scene,
        action: action
    }
};