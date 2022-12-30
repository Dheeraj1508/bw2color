import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PythonService {

  constructor(private http: HttpClient) {

   }
   getDataFromServer() {
    this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
        console.log(data);
    })        
}
}
