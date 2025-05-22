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
  getCUstomerDetails() {
    let header= {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.getService('https://localhost:7016/api/customer',true,header);
  }
  postCustomerDetails(reqData:any) {
    let header= {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.postService('https://localhost:7016/api/customer', reqData, true, header);
  }
  checkout() {
    let header= {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.putService('https://localhost:7016/api/cart/checkout', {}, true, header);
  }
  getMyOrders(){
    let header= {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.getService('https://localhost:7016/api/cart/myOrders',true,header);
  }
  getBookById(id:any) {
    let header= {
      headers:new HttpHeaders({

        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.getService(`https://localhost:7016/api/cart/getByBookId?bookId=${id}`,true,header);
  }
  deleteCart(bookId:any) {
    let header= {
      headers:new HttpHeaders({

        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    }
    return this.http.deleteService(`https://localhost:7016/api/cart?bookId=${bookId}`,true,header);
  }

  // updateCart(id:any, reqData:any) {
  //   return this.http.putService(`https://localhost:7016/api/cart/${id}`, reqData, false);
  // }
}
