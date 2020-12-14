import { useDispatch } from "react-redux";
import { Store } from "redux";
import { Item, ItemState } from "../states/ItemState";

export type ItemAction = { type: "ADD_ITEM" | "STATE_CHANGE" | "STATE_CHANGE_WITHOUT_REST", payload: Item };

export const addItem = (item: Item): ItemAction => ({
    type: "ADD_ITEM",
    payload: item
});

export const itemStateChange = (item: Item): ItemAction => ({
    type: "STATE_CHANGE",
    payload: item
});

const _itemStateChangeWithoutRest = (item: Item): ItemAction => ({
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

    switch (type) {
        case "state":
            let payload: HabMqttPayload = JSON.parse(message.payload);
            store.dispatch(_itemStateChangeWithoutRest({
                link: item,
                label: item,
                state: payload.value
            }));
            break;
        default:
            // console.log("Unknown MQTT message: " + type);
            break;
    }
}