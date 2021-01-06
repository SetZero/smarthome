import { ApiService } from "../../Utils/ApiService";
import { Reducer } from "redux";
import { ItemAction } from "../actions/ItemActions";

export enum ItemState {
    ON = "ON", OFF = "OFF"
}

export interface Item {
    label: string
    state: ItemState
    link: string
    type: string
    name:string
}

export interface ItemList {
    items: Item[]
}

/*let async initialState = ApiService.GetAllItems().then((el: any) => {
    el.map((item: Item) => item.label);
})*/

export let itemReducer = async () => {
    return new Promise<Reducer<any, ItemAction>>((resolve, reject) => {
        ApiService.GetAllItems().then((el: any) => {
            const initialState = { 
                items: el.items
                .map((item: Item) => { return { label: item.label, state: item.state, link: item.link, type: item.type, name:item.name} }) 
            };
            const reducer = (state: ItemList = initialState, action: ItemAction) => {
                switch (action.type) {
                    case "ADD_ITEM": {
                        return { ...state, items: [...state.items, action.payload] };
                    }
                    case "STATE_CHANGE": {
                        ApiService.switchStateChange(action.payload.state, action.payload.link);
                        return state;
                    }
                    case "STATE_CHANGE_WITHOUT_REST": {
                        console.log("State:", action.payload.state);
                        //ApiService.switchStateChange(action.payload.state, action.payload.link);
                        let deepCopy: Item[] = JSON.parse(JSON.stringify(state.items));
                        let element = deepCopy.find(element => element.link.split('/').slice(-1)[0] === action.payload.label);
                        if (element) element.state = action.payload.state;
                        return { ...state, items: [...deepCopy] };
                    }
                    default:
                        return state;
                }
            }
            resolve(reducer);
        }).catch(() => reject("Unable to convert Item result to JSON"))
    });
};