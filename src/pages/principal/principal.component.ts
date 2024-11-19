import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentification/auth.service';



@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, 
    RouterModule ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  template:`<h1>Page principale</h1>`
})
export class PrincipalComponent {
  constructor(public authService: AuthService) {}
  onLogout() {
    this.authService.authenticated = false;
    this.authService.roles = [];
  }
}
