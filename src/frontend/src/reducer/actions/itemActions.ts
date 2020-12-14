import { Item } from "../states/ItemState";

export type ItemAction = {type: "ADD_ITEM" | "STATE_CHANGE", payload: Item};

export const addItem = (item: Item): ItemAction => ({
    type: "ADD_ITEM",
    payload: item
});

export const itemStateChange = (item: Item): ItemAction => ({
    type: "STATE_CHANGE",
    payload: item
});