  import { Component, DebugElement, EventEmitter, OnInit, Output } from '@angular/core';
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
    showForm = false;
    emyptyCart = false;
    showSummary= false;
    showCheckout= false;
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
      this.cart.getCUstomerDetails().subscribe((res:any) => {
        console.log(res.data);
        this.checkoutForm.patchValue({
          customerFullName: res.data.customerFullName,
          customerAddress: res.data.customerAddress,
          customerPhone: res.data.customerPhone,
          customerCity: res.data.customerCity,
          customerState: res.data.customerState,
        });

        
      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error fetching customer details:', error.error.message);
        }
      });
    }
    async getCartDetail():Promise<any> {
      this.cart.getCartDetail().subscribe((res:any) => {
        console.log(res.data);
        this.cartDetail = res.data;
        this.cartCount.emit(res.data.cartItems.length);
        if(this.cartDetail.cartItems.length === 0){
          this.emyptyCart = true;
        }
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
    async checkout(val:string){
      this.cart.checkout().subscribe(async (res:any) => {
        await this.getCartDetail();
        this.homeClick.emit(val);

      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error during checkout:', error.error.message);
        }
      });
    }

    decreaseQuantity(id:any){
      this.cart.decreaseQuantity(id).subscribe((res:any) => {
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
        this.getCartDetail();
      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error increasing quantity:', error.error.message);
        }
      });
    }
    onSubmit(){
      
      if(this.checkoutForm.valid){
      let reqData={
        customerFullName: this.checkoutForm.value.customerFullName,
        customerAddress: this.checkoutForm.value.customerAddress,
        customerPhone: this.checkoutForm.value.customerPhone,
        customerCity: this.checkoutForm.value.customerCity,
        customerState: this.checkoutForm.value.customerState,
        addressType: this.checkoutForm.value.addressType
      }
      this.cart.postCustomerDetails(reqData).subscribe((res:any) => {
        this.showSummary = true;
      }, (error) => {
        // Handle HTTP error
        if (error.error && error.error.message) {
          console.error('Error submitting form:', error.error.message);
        }
      });
    }else{
      this.markAllAsTouched(this.checkoutForm);
      console.log('Form is invalid');
    }
      
    }
    private markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markAllAsTouched(control as FormGroup);
      }
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  }
