import { ApiService } from "../../Utils/ApiService";
import { rejects } from "assert";
import { Reducer } from "redux";
import { Url } from "url";
import { act } from "react-dom/test-utils";
import { Scenes } from './../../views/Scenes';
import { Action, ItemRefAction } from "../actions/SceneActions";
import { ItemRef } from "./RoomStates";

export interface SceneState {
    name: string;
    url: string;
    sensors?: Array<ItemRef>;
}

export interface ScenesState {
    scenes: SceneState[]
}

// TODO: UPDATE_ACTION_ID
export let scenesReducer = async () => {
    return new Promise<Reducer<any, Action>>((resolve, reject) => {
        ApiService.GetAllScenes().then((readState: ScenesState) => {
            console.log("Current scenes state : " + JSON.stringify(readState));
            const reducer = (state: ScenesState = readState, action: Action | ItemRefAction) => {
                switch(action.type) {
                    case "ADD_SCENE": {
                        return {...state, scenes: [...state.scenes, action.payload]};
                    }
                    case "REMOVE_SCENE": {
                        let tempState= JSON.parse(JSON.stringify(state));
                        console.log("RemoveScene",state)
                        console.log(action.payload.name)
                        var found = false;
                        for(var i =0; i<tempState.scenes.length;i++){
                            if(tempState.scenes[i].name ==action.payload.name){
                                found =true;
                                continue;
                            }
                            if(found ==true)    
                                tempState.scenes[i-1] = tempState.scenes[i];
                        }
                        tempState.scenes.pop();
                        console.log("TempStat: ",tempState);
                        console.log("scenes: ",state.scenes)
                        return { ...state, ...tempState };
                    }
                    case "CHANGE_SCENE": {
                        let tempState= JSON.parse(JSON.stringify(state));
                        console.log("ChangeScene",state)
                        console.log(action.payload.name)
                        var found = false;
                        for(var i =0; i<tempState.scenes.length;i++){
                            if(tempState.scenes[i].name ==action.payload.name){
                                tempState.scenes[i] = action.scene2;
                                continue;
                            }
                        }
                        console.log("TempStat: ",tempState);
                        console.log("scenes: ",state.scenes)
                        return { ...state, ...tempState };
                    }
                    case "ADD_ITEM": {
                        let oldState = JSON.parse(JSON.stringify(state));
                        let ref = action.payload.ref.link;
                        state.scenes.find(e => e.name === action.payload.sceneName)?.sensors?.push({link: ref})
                        return {oldState, scenes: state.scenes};
                    }
                    case "REMOVE_ITEM": {
                        let oldState = JSON.parse(JSON.stringify(state));
                        let ref = action.payload.ref.link;
                        let selectedScene = state.scenes.find(e => e.name === action.payload.sceneName);
                        if(selectedScene && selectedScene.sensors) {
                            selectedScene.sensors = selectedScene?.sensors?.filter(e => e.link !== ref);
                        }
                        return {oldState, scenes: state.scenes};
                    }
                    default:
                        return state;
                }
            }
            resolve(reducer);
        }).catch((e) => {
            console.log(e);
            reject("Unable to convert scene result to JSON")
        })
    });
};
