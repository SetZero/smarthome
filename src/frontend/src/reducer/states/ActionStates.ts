import { ApiService } from "../../Utils/ApiService";
import { Reducer } from "redux";
import { ActionAction } from "../actions/ActionActions";
import { Item } from "./ItemState";

export enum ItemState {
    ON = "ON", OFF = "OFF"
}

export interface Action {
    sceneName : string;
    item: Item
}

export interface ActionList {
    actions: Action[]
}

export let actionReducer = async () => {
    return new Promise<Reducer<any, ActionAction>>((resolve, reject) => {
        ApiService.GetAllActions().then((el: any) => {
            console.log(JSON.stringify(el.actions));
            const initialState = { 
                actions : []
            };
            try {
                initialState.actions = el.actions
                    .map((action: Action) => { return { 
                        sceneName : action.sceneName,
                        item: {
                            label: action.item.label,
                            state: action.item.state,
                            link: action.item.link,
                            type: action.item.type,
                            name:action.item.name
                        }} });
            } catch {
                console.log("Couldn't load stored state");
            }
            const reducer = (state: ActionList = initialState, action: ActionAction) => {
                switch (action.type) {
                    case "ADD_ACTION": {
                        if (state.actions != undefined) {
                            return { ...state, actions: [...state.actions, action.payload] };
                        } else {
                            return { ...state, actions: [ action.payload ] };
                        }
                    }
                    case "ACTION_CHANGE": {
                        let oldState : ActionList = {
                            actions : Array.from(state.actions)
                        }
                        const resultIndex = state.actions.findIndex(e => e.sceneName == action.payload.sceneName && e.item.link == action.payload.item.link);
                        if (resultIndex != undefined && state.actions[resultIndex] != undefined) {
                            state.actions[resultIndex].item = action.payload.item;
                            console.log("Changed state to : " + JSON.stringify(state.actions[resultIndex]));
                        }
                        return { ... oldState, actions : [ ... state.actions ] };
                    }
                    case "REMOVE_ACTION": {
                        // TODO: remove action
                        let oldState : ActionList = {
                            actions : Array.from(state.actions)
                        }; 
                        let newActions = state.actions.filter(e => e.sceneName != action.payload.sceneName || e.item.name == action.payload.item.name);
                        return { ... oldState, actions : [ ... newActions ]};
                    }
                    default:
                        return state;
                }
            }
            resolve(reducer);
        }).catch((e) => { console.log(e); /*reject("Unable to convert Item result to JSON");*/ })
    });
};