import { ApiService } from "../../Utils/ApiService";
import { Reducer } from "redux";
import { ItemAction } from "../actions/ItemActions";

export enum ItemState {
    ON = "ON", OFF = "OFF"
}

export interface HabItem {
    label: string
    state: ItemState | number
    link: string
    type: string
    name:string
}

export interface Item extends HabItem {
    max?: number
    min?: number
}

export interface ItemList {
    items: Item[]
}

export let itemReducer = async () => {
    return new Promise<Reducer<any, ItemAction>>((resolve, reject) => {
        ApiService.GetAllItems().then((el: any) => {
            const initialState = { 
                items: el.items
                .map((item: Item) => { return { 
                    label: item.label, state: item.state, link: item.link, type: item.type, name:item.name, max: item.max, min: item.min
                } }) 
            };
            const reducer = (state: ItemList = initialState, action: ItemAction) => {
                switch (action.type) {
                    case "ADD_ITEM": {
                        return { ...state, items: [...state.items, action.payload] };
                    }
                    case "STATE_CHANGE": {
                        ApiService.setItemState(action.payload.state, action.payload.link);
                        return state;
                    }
                    case "UPDATE_INFO" : {
                        let newItems = Array.from(state.items);
                        // Is name guaranteed to be unique ? 
                        const foundItem = newItems.findIndex(e => e.name === action.payload.name);

                        let newItem : Item | undefined = undefined;

                        if ((action.payload as Item).max) {
                            newItem = action.payload;
                        }

                        if (newItems !== undefined && newItems[foundItem] !== undefined && newItem !== undefined) {
                            newItems[foundItem].max = newItem.max;
                            newItems[foundItem].min = newItem.min;
                        }

                        return { ...state, items: [ ... newItems ]};
                    }
                    case "STATE_CHANGE_WITHOUT_REST": {
                        // console.log("Update State:", action.payload.state);
                        let deepCopy: Item[] = Array.from(state.items);
                        let element = deepCopy.find(element => element.link.split('/').slice(-1)[0] === action.payload.label);
                        if (element) 
                            element.state = action.payload.state;
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