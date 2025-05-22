import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  token:any;

  constructor(private http :HttpService) {
    this.token = localStorage.getItem('token');
   }
  addToWishList(id:any){
    let header = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.token}`
      })
    }
    return this.http.postService(`https://localhost:7016/api/wishList?bookId=${id}`,{},true,header);
}
  getWishList(){
    let header = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.token}`
      })
    }
    return this.http.getService('https://localhost:7016/api/wishList',true,header);
  }
  removeWishList(bookId:any){
    let header = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.token}`
      })
    }
    return this.http.deleteService(`https://localhost:7016/api/wishList?bookId=${bookId}`,true,header);
  }
  getWishByBookId(bookId:any){
    let header = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.token}`
      })
    } 
    return this.http.getService(`https://localhost:7016/api/wishList/getByBookId?bookId=${bookId}`,true,header);
  }
}
