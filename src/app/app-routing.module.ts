import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { authguardGuard } from './Components/Guard/authguard/authguard.guard';
import { BooksComponent } from './Components/books/books.component';
import { DisplaybooksComponent } from './Components/displaybooks/displaybooks.component';
import { BookdetailComponent } from './Components/bookdetail/bookdetail.component';
import { CartComponent } from './Components/cart/cart.component';
import { WhishListComponent } from './Components/whish-list/whish-list.component';

const routes: Routes = [
  {path: '', component:AuthComponent},
  {path:'dash', component:DashboardComponent,
    children:[
      {path:'books',component:BooksComponent,
        children:[
        {path:'display',component:DisplaybooksComponent}
      ]},
    {path:'detail',component:BookdetailComponent},
    {path:'cart',component:CartComponent},
    {path:'wish',component:WhishListComponent}


    ],canActivate:[authguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
