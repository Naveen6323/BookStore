import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CarttService } from '../../Services/Cart/cartt.service';
import { WishService } from '../../Services/wishlist/wish.service';

@Component({
  selector: 'app-bookdetail',
  standalone: false,
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.scss'
})
export class BookdetailComponent implements OnInit {
  @Input() bookDetail: any;
  @Output() cartClick:EventEmitter<any>=new EventEmitter<any>();
  @Output() addCartEvent:EventEmitter<any>=new EventEmitter<any>();
  constructor(private cart:CarttService,private wish:WishService) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['bookDetail'] && changes['bookDetail'].currentValue) {
  //     console.log('Book detail changed:', changes['bookDetail'].currentValue); // Debugging line
  //   }
  // }
  ngOnInit(): void {
    // Initialization logic here
    

  }
  onCartClick(string:any) {
    this.cartClick.emit(string);
  }
  addCart(bookId:number) {
    // Logic to add the book to the cart
    this.cart.addToCart(bookId).subscribe((res:any) => {
      this.addCartEvent.emit(bookId);
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
      console.log(res);
      // Handle success response here
    }, (error) => {
      // Handle error response here
      if (error.error && error.error.message) {
        console.error('Error adding book to wish list:', error.error.message); // Debugging line
      } else {
        console.error('An unexpected error occurred:', error); // Debugging line
      }
    });
  }
}
