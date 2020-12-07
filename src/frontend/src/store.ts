import { createStore } from "redux"
import { rootReducer } from "./reducer/rootReducer"

export const loadState = () => {
  try {
    const storedState = localStorage.getItem('state');
    if (storedState === null) {
      return undefined;
    }
    return JSON.parse(storedState);
  } catch (err) {
    return undefined;
  }
}; 

export const updateStoredState = () => {
    // TODO: delta between stored and to store state, don't just store the whole thing completly
    try {
        localStorage.setItem('state', JSON.stringify(store.getState()))
    } catch {
    }
}

const storedState = loadState();
export const store = createStore(rootReducer, storedState);
store.subscribe(updateStoredState);

