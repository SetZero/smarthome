import { createStore } from "redux"
import { rootReducer } from "./reducer/rootReducer"


export const store = createStore(rootReducer);
store.subscribe(updateStoredState);

function updateStoredState() {
    // TODO: delta between stored and to store state, don't just store the whole thing completly
    localStorage.setItem('state', JSON.stringify(store.getState()))
}