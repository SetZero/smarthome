import { Action } from "../actions/SceneActions";

export interface SceneState {
    name: string;
    url: string;
}

export interface ScenesState {
    scenes: SceneState[]
}


const initialState = {
        scenes: [
            { name: "Morgenprogramm", url: "https://www.poynter.org/wp-content/uploads/2019/07/shutterstock_264132746.jpg" },
            { name: "Abendprogramm", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg" },
            { name: "Urlaub", url: "https://www.dmjmaviation.com/wp-content/uploads/2018/05/caribbean-destination.jpg" }
        ]
}

export const scenesReducer = (state: ScenesState  = initialState, action: Action) => {
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
        default:
            return state;
    }
}