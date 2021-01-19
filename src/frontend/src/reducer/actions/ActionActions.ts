import { Store } from 'redux'
import { Action } from "../states/ActionStates"

export type ActionAction = { type : "ADD_ACTION" | "ACTION_CHANGE" | "REMOVE_ACTION", payload : Action};

export const addActionToScene = ( action : Action) : ActionAction => {
    return {
        type : "ADD_ACTION",
        payload : action
    }
};

export const updateAction = (action : Action) : ActionAction => {
    return {
        type : "ACTION_CHANGE",
        payload : action
    }
};

export const removeActionFromScene = (action : Action) : ActionAction => {
    return {
        type : "REMOVE_ACTION",
        payload : action
    }
};