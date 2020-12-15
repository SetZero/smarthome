import { createStore } from "redux"
import { rootReducer } from "./reducer/rootReducer"
import { itemUpdater } from "./reducer/actions/itemActions";
import { ApiService } from "./Utils/ApiService"

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
    console.log("Updating State");
    // TODO: delta between stored and to store state, don't just store the whole thing completly
    try {
      //TODO: store
        //localStorage.setItem('state', JSON.stringify(store.getState()))
    } catch {
    }
}

const storedState = loadState();
export const configureStoreAsync = async () => {
  let store = createStore(await rootReducer(), storedState);
  store.subscribe(updateStoredState);

  ApiService.listenForItemChange(store, itemUpdater);
  return store;
 };


