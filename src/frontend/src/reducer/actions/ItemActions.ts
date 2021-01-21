import { Store } from "redux";
import { HabItem, Item, ItemState } from "../states/ItemState";

export type ItemAction = { type: "ADD_ITEM" | "STATE_CHANGE" | "STATE_CHANGE_WITHOUT_REST" | "UPDATE_INFO", payload: Item | HabItem};

export const addItem = (item: Item): ItemAction => ({
    type: "ADD_ITEM",
    payload: item
});

export const itemStateChange = (item: Item): ItemAction => ({
    type: "STATE_CHANGE",
    payload: item
});

export const itemUpdateInfo = (item : Item) : ItemAction => ({
    type : "UPDATE_INFO",
    payload: item
})

const _itemStateChangeWithoutRest = (item: HabItem): ItemAction => ({
    type: "STATE_CHANGE_WITHOUT_REST",
    payload: item
});

interface HabMqttMessage {
    topic: string;
    payload: string;
    type: string;
}

interface HabMqttPayload {
    type: string;
    value: ItemState;
}

export let itemUpdater = (store: Store<any>, event: MessageEvent<string>) => {
    let message: HabMqttMessage = JSON.parse(event.data);
    let topic = message.topic;
    let item = topic.match(/items\/(.*?)\//)?.[1] ?? "";
    let type = topic.match(/items\/.*?\/(.*?)$/)?.[1] ?? "";

    // TODO: listen to updates to stateUI, but don't update when the changes were made from this instance,
    // otherwise this will lead to a recursion without any breaks!
    // Don't touch if you don't want to use up all your ram
    if (item.includes("stateUI")) {
        return;
    }

    switch (type) {
        case "state":
            let payload: HabMqttPayload = JSON.parse(message.payload);
            let updatedItem : HabItem = {
                link: item,
                label: item,
                state: payload.value, 
                type: item,
                name: item
            };

            store.dispatch(_itemStateChangeWithoutRest(updatedItem));

            break;
        default:
            // console.log("Unknown MQTT message: " + type);
            break;
    }
}