import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BooksComponent } from './Components/books/books.component';
import { DisplaybooksComponent } from './Components/displaybooks/displaybooks.component';
import { FormsModule } from '@angular/forms';
import { BookdetailComponent } from './Components/bookdetail/bookdetail.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './Components/cart/cart.component';
import { WhishListComponent } from './Components/whish-list/whish-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    BooksComponent,
    DisplaybooksComponent,
    BookdetailComponent,
    CartComponent,
    WhishListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatBadgeModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
