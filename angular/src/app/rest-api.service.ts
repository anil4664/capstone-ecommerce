import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
  addUser(link: string, body: any) {
    /*console.log("inside the post of reset",link);
    console.log('MESSAGE IS',body);*/
    console.log("inside httplient", body);
    return this.http.post(link, body);// { headers: this.getHeaders() }).toPromise();
  }
}
