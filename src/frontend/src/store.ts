import { createStore } from "redux"
import { rootReducer } from "./reducer/rootReducer"
import { itemUpdater } from "./reducer/actions/ItemActions";
import { ApiService } from "./Utils/ApiService"

var store : any = null;

export const updateStoredState = () => {
    try {
      ApiService.StoreState(JSON.stringify(store.getState()));
    } catch {
    } 
}

export const configureStoreAsync = async () => {
  store = createStore(await rootReducer());
  store.subscribe(updateStoredState);

  ApiService.listenForItemChange(store, itemUpdater);
  return store;
 };


