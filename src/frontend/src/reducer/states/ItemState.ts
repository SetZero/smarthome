import { ItemAction } from "../actions/itemActions";
import { ApiService } from "../../Utils/ApiService";
import { rejects } from "assert";
import { Reducer } from "redux";
import { Url } from "url";
import { act } from "react-dom/test-utils";

export enum RoomCardSize {
    SMALL = 1,
    MEDIUM = 2,
    LARGE = 3
}

export enum ItemState {
    ON, OFF
}

export interface Item {
    link: string
    label: string
    state: ItemState
}

export interface ItemList {
    items: Item[]
}

/*let async initialState = ApiService.GetAllItems().then((el: any) => {
    el.map((item: Item) => item.label);
})*/

export let itemReducer = async () => {
    return new Promise<Reducer<any, ItemAction>>((resolve, reject) => {
        ApiService.GetAllItems().then((output: any) => output.json().then((el: any) => {
            const initialState = { items: el.map((item: Item) => { return { label: item.label, state: item.state, link: item.link } }) };
            const reducer = (state: ItemList = initialState, action: ItemAction) => {
                switch (action.type) {
                    case "ADD_ITEM": {
                        return { ...state, items: [...state.items, action.payload] };
                    }
                    case "STATE_CHANGE": {
                        ApiService.switchStateChange(action.payload.state, action.payload.link);
                        return state;
                    }
                    default:
                        return state;
                }
            }
            resolve(reducer);
        }).catch(() => reject("Unable to convert Item result to JSON"))
        ).catch(() => reject("Unable to contact Backend"));
    });
};