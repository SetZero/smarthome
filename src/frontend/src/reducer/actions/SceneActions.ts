import { ItemRef } from "../states/RoomStates";
import { ScenesState, SceneState } from "../states/SceneStates";

export type Action = {type: "ADD_SCENE"|"REMOVE_SCENE"|"CHANGE_SCENE", payload: SceneState, scene2?:SceneState};
export type ItemRefAction = {type: "ADD_ITEM"|"REMOVE_ITEM", payload: ItemRefScene}

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
export const addItemToScene = (itemRef: ItemRef, scene: string): ItemRefAction => ({
    type: "ADD_ITEM",
    payload: {ref: itemRef, sceneName: scene}
});

export const removeItemFromScene = (itemRef: ItemRef, scene: string): ItemRefAction => ({
    type: "REMOVE_ITEM",
    payload: {ref: itemRef, sceneName: scene}
});
