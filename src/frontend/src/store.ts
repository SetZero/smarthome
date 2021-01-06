import { createStore } from "redux"
import { rootReducer } from "./reducer/rootReducer"
import { itemUpdater } from "./reducer/actions/ItemActions";
import { ApiService } from "./Utils/ApiService"

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
  store = createStore(await rootReducer());
  // store = await storedState;
  store.subscribe(updateStoredState);

  ApiService.listenForItemChange(store, itemUpdater);
  return store;
 };


