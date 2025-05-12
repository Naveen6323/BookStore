import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit {
  token:any;
  constructor(private http:HttpService) {this.token=localStorage.getItem('token')} 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  getAllBooks() {
    let header={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.http.getService('https://localhost:7016/api/book?pageNo=1&pageSize=10',true,header);
  }
}
