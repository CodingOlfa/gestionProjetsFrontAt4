// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/authentification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];

    if (this.authService.isAuthenticated() && this.authService.hasRole(requiredRoles)) {
      return true;
    }
   // this.router.navigate(['/403']); // Page d’accès non autorisé
    return false;
  }
}
