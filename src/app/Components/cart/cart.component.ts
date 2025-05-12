  import { Component, EventEmitter, OnInit, Output } from '@angular/core';
  import { Router } from '@angular/router';
  import { CarttService } from '../../Services/Cart/cartt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  @Component({
    selector: 'app-cart',
    standalone: false,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
  })
  export class CartComponent implements OnInit{
    cartDetail:any;
    checkoutForm!:FormGroup;
    @Output() homeClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() cartCount: EventEmitter<any> = new EventEmitter<any>();
    constructor(private router:Router,private cart:CarttService,private form :FormBuilder) { }

    ngOnInit(): void {
      this.getCartDetail();
      this.checkoutForm = this.form.group({
        customerFullName: ['',[Validators.required]],
        customerAddress: ['',[Validators.required,Validators.minLength(10)]],
        customerPhone: ['',[Validators.required,Validators.pattern('^\\d{10}$')]],
        customerCity: ['',[Validators.required]],
        customerState: ['',[Validators.required]],
        addressType: ['home',[Validators.required]],
      });

    }
    getCartDetail():any{
      this.cart.getCartDetail().subscribe((res:any) => {
        console.log(res.data);
        this.cartDetail = res.data;
        this.cartCount.emit(this.cartDetail.cartItems.length);
      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error fetching cart items:', error.error.message);
        }
      });
      return this.cartDetail;
    }
    onHome(){
      this.homeClick.emit('books');

    }
    decreaseQuantity(id:any){
      this.cart.decreaseQuantity(id).subscribe((res:any) => {
        console.log(res);
        this.getCartDetail();
      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error decreasing quantity:', error.error.message);
        }
      });
    }
    increaseQuantity(id:any){
      this.cart.addToCart(id).subscribe((res:any) => {
        console.log(res);
        this.getCartDetail();
      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error increasing quantity:', error.error.message);
        }
      });
    }
    onSubmit(){
      if(this.checkoutForm.invalid){
        this.markAllAsTouched(this.checkoutForm);
        return;
      }
      const reqData={
        customerFullName: this.checkoutForm.value.customerFullName,
        customerAddress: this.checkoutForm.value.customerAddress,
        customerPhone: this.checkoutForm.value.customerPhone,
        customerCity: this.checkoutForm.value.customerCity,
        customerState: this.checkoutForm.value.customerState,
        addressType: this.checkoutForm.value.addressType
      }
      console.log(reqData);
      
    }
    private markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markAllAsTouched(control as FormGroup);
      }
    });
  }

  }
