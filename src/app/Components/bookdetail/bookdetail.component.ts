import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CarttService } from '../../Services/Cart/cartt.service';
import { WishService } from '../../Services/wishlist/wish.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookdetail',
  standalone: false,
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.scss'
})
export class BookdetailComponent implements OnInit {
  wished: boolean = false;
  bookDetailData: any;
  quantity: number = 0;
  @Input() bookDetail: any;
  @Output() cartClick:EventEmitter<any>=new EventEmitter<any>();
  @Output() addCartEvent:EventEmitter<any>=new EventEmitter<any>();
  constructor(private cart:CarttService,private wish:WishService ,private snackbar:MatSnackBar) { }
  ngOnInit(): void {
    // Initialization logic here
    this.cart.getBookById(this.bookDetail.id).subscribe((res:any) => {
      console.log(res);
      this.quantity=res.data;
  }, (error) => {
    // Handle HTTP error
    if (error.error && error.error.message) {
      console.error('Error fetching book details:', error.error.message);
    }
  });
  this.getWishByBookId(this.bookDetail.id);
}
  onCartClick(string:any) {
    this.cartClick.emit(string);
  }
  addCart(bookId:number) {
    // Logic to add the book to the cart
    this.cart.addToCart(bookId).subscribe((res:any) => {
      this.addCartEvent.emit(bookId);
      console.log(res);
      this.ngOnInit();
      // Handle success response here
    }, (error) => {
      // Handle error response here
      if (error.error && error.error.message) {
        console.error('Error adding book to cart:', error.error.message); // Debugging line
      } else {
        console.error('An unexpected error occurred:', error); // Debugging line
      }
    }
    );
  }
  addTowhish(bookId:number){
    this.wish.addToWishList(bookId).subscribe((res:any) => {
      this.ngOnInit();
      this.snackbar.open('Book added to wish list', 'Close', {
        duration: 2000});
        
      // Handle success response here
    }, (error) => {
      // Handle error response here
      if (error.status==400 && error.error && error.error.message) {
        
        
        console.log('Error adding book to wishlist:', error.error.message);
        this.snackbar.open('Book already in wish list', 'Close', {
          duration: 2000});
      } else {
        this.snackbar.open('unexpected error', 'Close', {
        duration: 2000});
      }
    });
  }
  
  decrement(id:number){
    this.cart.decreaseQuantity(id).subscribe((res:any) => {
      this.addCartEvent.emit(id);
      this.ngOnInit();

      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error decreasing quantity:', error.error.message);
        }
      });
  }
  getCartDetail(){
    this.cart.getCartDetail().subscribe((res:any) => {
      console.log("got book quantity",res.data);
      this.bookDetailData = res.data.cartItems.filter((item: any) => item.bookId === this.bookDetail.bookId);
      console.log(this.bookDetailData);
    }, (error) => {
      // Handle HTTP error
      if (error.error && error.error.message) {
        console.error('Error fetching cart details:', error.error.message);
      }
    });
  }
  getWishByBookId(bookId:number){
    this.wish.getWishByBookId(bookId).subscribe((res:any) => {
      console.log(res);
      this.wished = true;
    }, (error) => {
      // Handle HTTP error
      if (error.error && error.error.message) {
        console.error('Error fetching wishlist details:', error.error.message);
      }
    });
  }
}
