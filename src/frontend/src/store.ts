import { createStore } from "redux"
import { rootReducer } from "./reducer/rootReducer"
import { itemUpdater } from "./reducer/actions/ItemActions";
import { ApiService } from "./Utils/ApiService"

export const loadState = async () => {
  try {
    let state = await ApiService.GetStoredState();
    console.log("Stored state " + JSON.stringify(state.state));
    return state.state;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const storedState = loadState();
var store : any = null;

export const updateStoredState = () => {
    console.log("Updating State");
    try {
      ApiService.StoreState(JSON.stringify(store.getState()));
      console.log("Updated state of UI");
    } catch {
    } 
}

export const configureStoreAsync = async () => {
  store = createStore(await rootReducer(), await storedState);
  // store = await storedState;
  store.subscribe(updateStoredState);

  // TODO: listen to updates, but don't update our changes
  // otherwise this will lead to a recursion without any breaks!
  // ApiService.listenForItemChange(store, itemUpdater);
  return store;
 };


