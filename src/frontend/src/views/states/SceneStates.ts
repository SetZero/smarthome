export interface SceneState {
    name: string;
    url: string;
}

export interface ScenesState {
    scenes: SceneState[]
}

const initialState = {
    scenes: []
}

type Action = {type: "ADD_SCENE", payload: SceneState}

export const scenesReducer = (state: ScenesState  = initialState, action: Action) => {
    switch(action.type) {
        case "ADD_SCENE": {
            return {...state, notes: [...state.scenes, action.payload]};
        }
        default:
            return state;
    }
}