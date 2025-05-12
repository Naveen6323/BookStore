import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarttService {
  token:any;
  constructor(private http:HttpService) { 
    this.token = localStorage.getItem('token');
  }
  addToCart(bookId:number) {
    let header= {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }

    return this.http.postServiceCart(`https://localhost:7016/api/cart?bookId=${bookId}`,{},true,header);
  }

  getCartDetail() {
    let header= {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.getService('https://localhost:7016/api/cart',true,header);
  }
  decreaseQuantity(id:any) {
    let header= {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.putService(`https://localhost:7016/api/cart?bookId=${id}&quantity=1`, {}, true, header);
  }


  // deleteCart(id:any) {
  //   return this.http.deleteService(`https://localhost:7016/api/cart/${id}`, false);
  // }

  // updateCart(id:any, reqData:any) {
  //   return this.http.putService(`https://localhost:7016/api/cart/${id}`, reqData, false);
  // }
}
