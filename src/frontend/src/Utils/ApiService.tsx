import { request } from "http";
import { Action, Store } from "redux";
import { Url } from "url";
import { ItemAction } from "../reducer/actions/itemActions";
import { ItemState } from "../reducer/states/ItemState";

export class ApiService {

    static itemURL: string = "http://localhost:8080/rest/items/";
    static persistenceURL: string = "http://localhost:8080/rest/persistence/items/";

    // TODO: Add methods to write to stateUI

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
            currentState =  await response.json();
            return currentState.data[0]
        } catch (err) {
            console.log(err);
            console.log("Couldn't read stored state");
            console.log(JSON.stringify(currentState));
        }

        return undefined;
    }

    static async switchStateChange(onOff: ItemState, link: string) {
        if (!link.startsWith(ApiService.itemURL))
            link = ApiService.itemURL + link;

        var message;
        if (onOff === ItemState.ON)
            message = "ON";
        else
            message = "OFF";

        const response = await fetch(link, {
            method: 'POST',
            body: message,
            headers: {
                'Content-Type': 'text/plain',
                'Accept': 'application/json'
            }
        });
    }


    static async ChangeDimmer(value: string, name: string) {
        var message = '' + value;

        const response = await fetch(this.itemURL + name, {
            method: 'POST',
            body: message,
            headers: {
                'Content-Type': 'text/plain',
                'Accept': 'application/json'
            }
        });
    }

    //Funktioniert noch nicht. response liegt als Promise<response> vor soll aber json sein
    static async GetAllItems() {
        const response = await fetch("http://localhost:8080/rest/items?recursive=false", {
            method: 'GET',
            headers: { 'Accept': 'application/json' },

        });
        return response;
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
