import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarttService } from '../../Services/Cart/cartt.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  @Output() homeClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cartCount: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cart:CarttService){}
  ngOnInit(): void {
    this.getCartDetail();
  }
  toHome(val:any){
    this.homeClick.emit(val);
  }
  async getCartDetail():Promise<void> {
      this.cart.getCartDetail().subscribe((res:any) => {
        console.log(res.data);
        this.cartCount.emit(res.data.cartItems.length);
      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error fetching cart items:', error.error.message);
        }
      });
    }

}
