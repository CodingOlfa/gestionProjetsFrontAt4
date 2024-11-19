import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authentification/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginError:string='';


constructor(public authService: AuthService, 
            private router: Router) {}
onLogin() {
  this.authService.login(this.authService.username, this.authService.password).subscribe({
      next: (data) => {
        console.log(data);
        this.authService.authenticated = true;
        // Extraire les rôles depuis `authorities`
      this.authService.roles = data.authorities.map((auth: any) => auth.authority) || [];
      //console.log(this.authService.roles);
        this.router.navigate(['/principal']); // Rediriger vers la page principal
        
      },
      error: (err) => {
        this.authService.authenticated = false;
        this.loginError="Bad credentials!!!!"
      }
    });   
}






}
