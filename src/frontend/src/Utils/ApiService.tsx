import { request } from "http";
import { Action, Store } from "redux";
import { Url } from "url";
import { ItemAction } from "../reducer/actions/ItemActions";
import { ItemState } from "../reducer/states/ItemState";

export class ApiService {

    static itemURL: string = "http://localhost:8080/rest/items/";
    static persistenceURL: string = "http://localhost:8080/rest/persistence/items/";

    static async ChangeSwitch(onOff: boolean, name: string) {
        var message;
        if (onOff)
            message = "ON";
        else
            message = "OFF";

        const response = await fetch(this.itemURL + name, {
            method: 'POST',
            body: message,
            headers: {
                'Content-Type': 'text/plain',
                'Accept': 'application/json'
            }
        });
    }

    static async StoreState(state: string) {
        const response = await fetch(this.itemURL + "stateUI/state", {
            method: 'PUT',
            body: state,
            headers : {
                'Content-Type' : 'text/plain',
                'Accept' : 'application/json'
            }
        });

    }

    static async GetStoredState() {
        const response = await fetch(this.persistenceURL + "stateUI", {
            method: 'GET',
            headers: {
                'Content-Type' : 'text/plain'
            }
        });
        var currentState;
        try {
            currentState = JSON.parse(await (response.json().then(persistedState => persistedState.data[0].state)));
            return currentState;
        } catch (err) {
            console.log(err);
            console.log("Couldn't read stored state");
            console.log(JSON.stringify(currentState));
        }

        return undefined;
    }

    static async GetAllRooms() {
        let storedRoomsReducer = (await ApiService.GetStoredState()).roomsReducer;
        if (storedRoomsReducer === undefined) {
            storedRoomsReducer = {};
        }
        if (storedRoomsReducer.rooms === undefined) {
            storedRoomsReducer.rooms = [];
        }
        return storedRoomsReducer;
    }

    static async GetAllScenes() {
        let storedScenesReducer = (await ApiService.GetStoredState()).scenesReducer;
        if (storedScenesReducer  === undefined) {
            storedScenesReducer = {};
        }
        if (storedScenesReducer.scenes === undefined) {
            storedScenesReducer.scenes = [];
        }
        return storedScenesReducer;
    }

    static async GetAllActions() {
        let storedActionsReducer = (await ApiService.GetStoredState()).actionsReducer;
        if (storedActionsReducer  === undefined) {
            storedActionsReducer = {};
        }
        if (storedActionsReducer.actions === undefined) {
            storedActionsReducer.actions = [];
        }
        return storedActionsReducer;

    }

    static async setItemState(newState : ItemState | number, link: string) {
        let value = "";

        if (!link.startsWith(ApiService.itemURL))
            link = ApiService.itemURL + link;

        if (newState == ItemState.OFF || newState == ItemState.ON) {
            value = newState;
        } else {
            value = newState.toString();
        }
    }

    static async switchStateChange(onOff: ItemState, link: string) {
        return this.setItemState(onOff, link);
    }


    static async ChangeDimmer(value: number, link: string) {
        return this.setItemState(value, link);
    }

    //Funktioniert noch nicht. response liegt als Promise<response> vor soll aber json sein
    static async GetAllItems() {
        const response = await fetch("http://localhost:8080/rest/items?recursive=false", {
            method: 'GET',
            headers: { 'Accept': 'application/json' },

        });
        // For now ignore stateUI item
        // TODO: maybe add some sort of prefix for special items
        const filteredItems = (await response.json().then((ele : any) => {
            return  { items : ele.filter((item : any) => item.name != "stateUI")};
        }));
        return filteredItems;
    }

    static async GetSwitchState(name: string) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://localhost:8443/rest/items/DeckenlampeSZ");
        xhr.send();
    }

    static async listenForItemChange(store: Store<any, any>, listenForEvents: (store: Store<any>, event: MessageEvent<string>) => void) {
        var connection = new EventSource('//localhost:8080/rest/events/');

        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };

        // Log messages from the server
        connection.onmessage = (event) => listenForEvents(store, event);
    }

}
