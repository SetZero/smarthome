import { ApiService } from "../../Utils/ApiService";
import { Reducer } from "redux";
import { Action } from "../actions/SceneActions";
import { HabItem } from "./ItemState";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";

export interface SmallItem extends HabItem {
}

export interface ItemAction {
    item: SmallItem
}

export interface SceneState {
    name: string;
    url: string;
    actions: Array<ItemAction>;
}

export interface ScenesState {
    scenes: SceneState[]
}

// TODO: Prevent duplicates
export let scenesReducer = async () => {
    return new Promise<Reducer<any, Action>>((resolve, reject) => {
        ApiService.GetAllScenes().then((readState: ScenesState) => {
            const reducer = (state: ScenesState = readState, action: Action) => {
                // console.log("Current scenes state : " + JSON.stringify(readState));
                switch(action.type) {
                    case "ADD_SCENE": {
                        return {...state, scenes: [...state.scenes, action.payload]};
                    }
                    case "REMOVE_SCENE": {
                        let tempState = JSON.parse(JSON.stringify(state));
                        var found = false;
                        for(var i =0; i<tempState.scenes.length;i++){
                            if(tempState.scenes[i].name === action.payload.name){
                                found =true;
                                continue;
                            }
                            if(found === true)    
                                tempState.scenes[i-1] = tempState.scenes[i];
                        }
                        tempState.scenes.pop();
                        return { ...state, ...tempState };
                    }
                    case "CHANGE_SCENE": {
                        let newScenes = Array.from(state.scenes);

                        const resultIndex = newScenes.findIndex(e => e.name === action.payload.name);

                        if (resultIndex !== undefined && newScenes[resultIndex] !== undefined && action.scene2 !== undefined) {
                            newScenes[resultIndex].name = action.scene2.name;
                            newScenes[resultIndex].url = action.scene2.url;
                        }

                        return { ...state, scenes: newScenes };
                    }
                    case "ADD_ACTION_TO_SCENE" : {
                        let newScenes = Array.from(state.scenes);
                        let a = action.action;
                        if (a === undefined) {
                            return { ...state };
                        }
                        const stateIndex = newScenes.findIndex(e => e.name === action.payload.name);
                        if (stateIndex === undefined || newScenes[stateIndex] === undefined) {
                            return { ...state };
                        }

                        if (newScenes[stateIndex].actions === undefined) {
                            newScenes[stateIndex].actions = [];
                        }

                        newScenes[stateIndex].actions.push({item: a.item})
                        return { ...state , scenes : newScenes };
                    }

                    case "ACTION_CHANGE_IN_SCENE" : {
                        if (action.action === undefined) {
                            return { ...state};
                        }

                        let link = action.action.item.link;
                        let newScenes = Array.from(state.scenes);
                        let selectedRoomIndex = newScenes.findIndex(e => e.name === action.payload.name);
                        if(selectedRoomIndex !== undefined && newScenes[selectedRoomIndex].actions !== undefined) {
                            const actionIndex = newScenes[selectedRoomIndex].actions.findIndex(e => e.item.link === link);
                            if (actionIndex !== undefined) {
                               newScenes[selectedRoomIndex].actions[actionIndex] = action.action;
                            }
                        }
                        return { ...state, scenes: newScenes};

                    }

                    case "REMOVE_ACTION_FROM_SCENE" : {
                        if (action.action === undefined) {
                            return { ...state};
                        }

                        let link = action.action.item.link;
                        let newScenes = Array.from(state.scenes);
                        let selectedRoomIndex = newScenes.findIndex(e => e.name === action.payload.name);
                        if(selectedRoomIndex !== undefined && newScenes[selectedRoomIndex].actions !== undefined) {
                            newScenes[selectedRoomIndex].actions = newScenes[selectedRoomIndex]?.actions?.filter(e => e.item.link !== link);
                        }
                        return { ...state, scenes: newScenes};

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
