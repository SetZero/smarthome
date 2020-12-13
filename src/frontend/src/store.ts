import { createStore } from "redux"
import { rootReducer } from "./reducer/rootReducer"


export const configureStoreAsync = async () => { return createStore(await rootReducer()) };