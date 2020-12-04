export class ApiService  {
   private const itemURL:string ='https://localhost:8443/rest/items/';

    static async ChangeSwitch(onOff:boolean, name:string){
        var message;
        if(onOff)
            message="ON";
        else
            message="OFF";

        const response = await fetch(itemURL+name, {
              method: 'POST',
              body: message,
              headers: {'Content-Type': 'text/plain',
                        'Accept':'application/json'} });
    }


    static async ChangeDimmer(value:number, name:string){
        var message = ''+value;
        
        const response = await fetch(url, {
              method: 'POST',
              body: message,
              headers: {'Content-Type': 'text/plain',
                        'Accept':'application/json'} });
    }

}
