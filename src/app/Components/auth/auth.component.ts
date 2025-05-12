import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  constructor(private formBuilder:FormBuilder,private user:UserService,private snackBar:MatSnackBar,private route:Router) { }
  loginForm!: FormGroup;
  registerForm!: FormGroup;

ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
    this.registerForm = this.formBuilder.group({
      name:['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      phone: ['',[Validators.required,Validators.pattern('^\\d{10}$')]]
    });
    // Initialization logic here
  }
  
  login() {
    // Handle form submission logic here
    if(this.loginForm.valid) {
      let reqData = {
       email : this.loginForm.value.email,
       password : this.loginForm.value.password
      }
      this.user.login(reqData).subscribe((res:any) => {
          // Handle successful login
          console.log('Login successful!');
          console.log(res.data.accessToken);
          // Store the token in local storage or session storage
          localStorage.setItem('token', res.data.accessToken);
          this.route.navigate(['/dash']);
        }, (error) => {
        // Handle HTTP error
        if (error.status === 400 && error.error && error.error.message) {
          this.snackBar.open(error.error.message, 'close', {
            duration: 3000
          });        
        } else {
          this.snackBar.open('unexcepted error', 'close', {
            duration: 3000
          });
        }
        
      });
    }
  }
  register() {
    // Handle form submission logic here
    if(this.registerForm.valid) {
      let reqData = {
        name: this.registerForm.value.name,
        email : this.loginForm.value.email,
        password : this.loginForm.value.password,
        phone: this.registerForm.value.phone
      }
      this.user.register(reqData).subscribe((res:any) => {
        console.log(res);
        if(res.status == 200) {
          // Handle successful login
          console.log('Login successful!');
        } else {
          // Handle login error
          console.error('Login failed:', res.message);
        }
      }, (error) => {
        // Handle HTTP error
        console.error('HTTP error:', error);
      });
    }
  }
  toLogin(){
    this.isLoginMode = true;
  }
  toRegister(){
    this.isLoginMode = false;
  }

}
