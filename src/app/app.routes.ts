import { RouterModule, Routes } from '@angular/router';
import { ListingDepartementsComponent } from '../pages/departements/listing-departements/listing-departements.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { AccueilComponent } from '../pages/accueil/accueil.component';
import { PrincipalComponent } from '../pages/principal/principal.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'principal', component: PrincipalComponent, 
    children: [ // Sous-routes de Principal
      { path: 'accueil', component: AccueilComponent },
      { path: 'listeDepartements', component: ListingDepartementsComponent,
        canActivate: [AuthGuard]      },
      { path: 'listeEmployes', component: ListingDepartementsComponent,
        canActivate: [AuthGuard]      },
      { path: 'listeProjets', component: ListingDepartementsComponent,
        canActivate: [AuthGuard]       },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' } // Redirection par défaut vers Accueil
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirection par défaut vers login
  { path: '**', redirectTo: '/login' } , // Gestion des routes non trouvées (404)
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }

