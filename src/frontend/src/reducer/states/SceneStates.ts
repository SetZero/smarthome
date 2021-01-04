export interface SceneState {
    name: string;
    url: string;
}

export interface ScenesState {
    scenes: SceneState[]
}

type Action = {type: "ADD_SCENE", payload: SceneState}

// TODO: add action id to the states
const initialState = {
        scenes: [
            { name: "Morgenprogramm", url: "https://www.poynter.org/wp-content/uploads/2019/07/shutterstock_264132746.jpg" },
            { name: "Abendprogramm", url: "https://content.thriveglobal.com/wp-content/uploads/2019/04/Sunset_in_Coquitlam.jpg" },
            { name: "Urlaub", url: "https://www.dmjmaviation.com/wp-content/uploads/2018/05/caribbean-destination.jpg" }
        ]
}

// TODO: UPDATE_ACTION_ID
export const scenesReducer = (state: ScenesState  = initialState, action: Action) => {
    switch(action.type) {
        case "ADD_SCENE": {
            return {...state, scenes: [...state.scenes, action.payload]};
        }
        default:
            return state;
    }
}