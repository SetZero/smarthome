import { request } from "http";

export class ApiService  {

    static itemURL: string="http://localhost:8080/rest/items/";

    static async ChangeSwitch(onOff:boolean, name:string){
        var message;
        if(onOff)
            message="ON";
        else
            message="OFF";

        const response = await fetch(this.itemURL+name, {
              method: 'POST',
              body: message,
              headers: {'Content-Type': 'text/plain',
                        'Accept':'application/json'} });
    }


    static async ChangeDimmer(value:string, name:string){
        var message = ''+value;
        
        const response = await fetch(this.itemURL+name, {
              method: 'POST',
              body: message,
              headers: {'Content-Type': 'text/plain',
                        'Accept':'application/json'} });
    }



    
    static async GetSwitchState( name:string){
        var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://localhost:8443/rest/items/DeckenlampeSZ");

xhr.send();

    }

}
