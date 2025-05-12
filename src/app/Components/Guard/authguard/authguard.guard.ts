import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../Services/User/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authguardGuard implements CanActivate {
  constructor(private router:Router,private user:UserService) { }
  canActivate(next:ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
      if(token){
        return true;
      }else{
        this.router.navigate(['/auth']);
        return false;
      }
    }
  
  
}
