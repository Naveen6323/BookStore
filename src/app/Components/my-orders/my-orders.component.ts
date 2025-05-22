import { Component, OnInit } from '@angular/core';
import { CarttService } from '../../Services/Cart/cartt.service';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  myOrders: any;
  orderItems: any;
  constructor(private cart:CarttService) { }

  ngOnInit(): void {
    this.getMyOrders();
  }
  getMyOrders() {
    this.cart.getMyOrders().subscribe((res:any) => {
      this.myOrders = res.data.cartItems;
      this.orderItems=this.myOrders.length;
      console.log(res.data);
    }, (error) => {
      // Handle HTTP error
      if (error.error && error.error.message) {
        console.error('Error fetching orders:', error.error.message);
      }
    });
  }

}
