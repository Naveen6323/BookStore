import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }
  login(reqData:any) {
    let header={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.postService('https://localhost:7016/api/user/login', reqData,false, header);

  }
  register(reqData:any) {
    let header={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.postService('https://localhost:7016/api/user', reqData,false, header);
  }
}
