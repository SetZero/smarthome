import { ItemState } from "../states/ItemState";

export type ItemAction = {type: "ADD_ITEM", payload: ItemState};

export const addRoom = (item: ItemState): ItemAction => ({
    type: "ADD_ITEM",
    payload: item
});