import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CarttService } from '../../Services/Cart/cartt.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild(CartComponent) cart!: CartComponent;
  activeComponent: string = 'books';
  cartCount: number = 0;
  cartDetail: any;
  searchValue: string = '';
  bookDetailData:any=null;
  constructor(private cartService:CarttService){}
  ngOnInit(): void {
    this.getCartDetail();
  }
  getCartDetail() {
    this.cartService.getCartDetail().subscribe((res:any) => {
      console.log(res.data);
      this.cartCount = res.data.cartItems.length;
    });
  }

  onBookDetailReceive(book: any) {
    this.bookDetailData = book;
    this.activeComponent = 'bookDetail';
    
  }
  toDashBoard(value: string) {
    this.activeComponent = value;
  }
  onCartClick(string:any) {
    
    this.activeComponent = string;
    //   if (this.cart) {
    //     this.cartDetail=this.cart.getCartDetail();
    // }
}
onWishClick(string:any) {
  this.activeComponent = string;
}
receiveCartCount(count: number) {
  this.cartCount = count;
  console.log('Cart count received:', count); // Debugging line
}
cartCountRefresh(res:any) {
  this.ngOnInit();
  console.log('Cart count refreshed:', this.cartCount); // Debugging line
}
}
