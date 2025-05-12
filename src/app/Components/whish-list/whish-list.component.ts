import { Component, OnInit } from '@angular/core';
import { WishService } from '../../Services/wishlist/wish.service';

@Component({
  selector: 'app-whish-list',
  standalone: false,
  templateUrl: './whish-list.component.html',
  styleUrl: './whish-list.component.scss'
})
export class WhishListComponent implements OnInit {
  wishListDetail: any;
  wishCount: any ;
  constructor(private wish:WishService) { }

  ngOnInit(): void {
    this.getWishListDetail();
  }

  getWishListDetail() {
    // Simulate fetching wish list details
    this.wish.getWishList().subscribe((res:any) => {
      console.log(res.data);
      this.wishListDetail = res.data;
      this.wishCount = this.wishListDetail.length.toString().padStart(2, '0');
    }, (error) => {
      // Handle HTTP error
      if (error.error && error.error.message) {
        console.error('Error fetching wish list items:', error.error.message);
      }
    });
  }
  removeFromWish(bookId: any) {
    this.wish.removeWishList(bookId).subscribe((res:any) => {
      console.log(res);
      this.getWishListDetail();
    }, (error) => {
      // Handle HTTP error
      if (error.error && error.error.message) {
        console.error('Error removing item from wish list:', error.error.message);
      }
    });
  }

}
