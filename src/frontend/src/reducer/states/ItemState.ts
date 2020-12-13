import { ItemAction } from "../actions/itemActions";
import { ApiService } from "../../Utils/ApiService";
import { rejects } from "assert";
import { Reducer } from "redux";

export enum RoomCardSize {
    SMALL = 1,
    MEDIUM = 2,
    LARGE = 3
}

export interface Item {
    label: string
}

export interface ItemState {
    items: Item[]
}

/*let async initialState = ApiService.GetAllItems().then((el: any) => {
    el.map((item: Item) => item.label);
})*/

export let itemReducer = async () => {
    return new Promise<Reducer<any, ItemAction>>((resolve, reject) => {
        ApiService.GetAllItems().then((output: any) => output.json().then((el: any) => {
            const reducer = (state: ItemState = el.map((item: Item) => item.label), action: ItemAction) => {
                switch (action.type) {
                    case "ADD_ITEM": {
                        return { ...state, items: [...state.items, action.payload] };
                    }
                    default:
                        return state;
                }
            }
            console.log(el);
            resolve(reducer);
        }).catch(() => reject("Unable to convert Item result to JSON"))
        ).catch(() => reject("Unable to contact Backend"));
    });
};