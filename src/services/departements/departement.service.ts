import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../../classes/Departement';
import { catchError, Observable, throwError } from 'rxjs';
import { Projet } from '../../classes/Projet';
import { AuthService } from '../authentification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private domaine = 'http://172.232.207.228:8080';
  private apiUrl = this.domaine + '/departements';
  //Injection de HttpClient
  constructor(private http: HttpClient, private authService:AuthService) { }

  //méthode qui appelle l'api pour lister les départements
  getDepartements(): Observable<Departement[]> {
    const basicAuth = 'Basic ' + btoa(this.authService.username + ':' + this.authService.password);
    const headers = new HttpHeaders({
      'Authorization': basicAuth
    });
    return this.http.get<Departement[]>(this.apiUrl, { headers });
  }

  //méthode qui appelle l'api pour supprimer un département
  deleteDepartement(id: number): Observable<Departement> {
    const basicAuth = 'Basic ' + btoa(this.authService.username + ':' + this.authService.password);
    const headers = new HttpHeaders({
      'Authorization': basicAuth
    });
    return this.http.delete<Departement>(this.apiUrl +"/"+ id, { headers } );
  }

  //méthode qui appelle l'api pour éditer un département
  editDepartement(departement: Departement): Observable<Departement> {
    const basicAuth = 'Basic ' + btoa(this.authService.username + ':' + this.authService.password);
    const headers = new HttpHeaders({
      'Authorization': basicAuth
    });
    return this.http.put<Departement>(this.apiUrl,departement, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Méthode de gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.message ;
    return throwError(() => new Error(errorMessage));
  }

  //méthode qui appelle l'api pour lister les projets d'un département
  getProjetsForDept(id:number): Observable<Projet[]> {
    const basicAuth = 'Basic ' + btoa(this.authService.username + ':' + this.authService.password);
    const headers = new HttpHeaders({
      'Authorization': basicAuth
    });
    return this.http.get<Projet[]>(this.apiUrl+"/" +id+"/projets",{ headers });
  }

  //méthode qui appelle l'api pour ajouter un département
  addDepartement(departement: any): Observable<Departement> {
    const basicAuth = 'Basic ' + btoa(this.authService.username + ':' + this.authService.password);
    const headers = new HttpHeaders({
      'Authorization': basicAuth
    });
    return this.http.post<Departement>(this.apiUrl,departement,{ headers }).pipe(
      catchError(this.handleError)
    );
  }

  //méthode qui appelle l'api pour ajouter un département
  searchDepartements(key: any): Observable<Departement[]> {
    const basicAuth = 'Basic ' + btoa(this.authService.username + ':' + this.authService.password);
    const headers = new HttpHeaders({
      'Authorization': basicAuth
    });
    return this.http.get<Departement[]>(this.apiUrl+"/recherche?keyword=" + key,{ headers });
  }
  
}//fin
