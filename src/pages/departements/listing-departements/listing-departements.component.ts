import { Component, OnInit, TemplateRef } from '@angular/core';
import { DepartementService } from '../../../services/departements/departement.service';
import { Departement } from '../../../classes/Departement';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Projet } from '../../../classes/Projet';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/authentification/auth.service';


@Component({
  selector: 'app-listing-departements',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ToastrModule, FormsModule, NgbPaginationModule],
  templateUrl: './listing-departements.component.html',
  styleUrl: './listing-departements.component.css'
})
export class ListingDepartementsComponent implements OnInit {
  departements: Departement[]= [];
  departementToDelete!: Departement;
  modalRef!: NgbModalRef; modalRef2!: NgbModalRef; 
  modalRef3!: NgbModalRef; modalRef4!: NgbModalRef;
  page:number = 1;
  page1:number = 1;
  dept!:Departement;
  errorMessage: string = '';
  projets!:Projet[];
  deptA: { id?: number; nom: string } = { nom: '' }; // Initialisation de l'objet deptA
  
  constructor(private departementService: DepartementService,
              public authService: AuthService,
              private modalService: NgbModal,
              private toastr: ToastrService
            ) {}

  ngOnInit(): void {
    this.loadDepartements();  // Charger les départements à l'initialisation
      //console.log(this.departements);

    }

  loadDepartements(): void {
    this.departementService.getDepartements().subscribe({
      next: (data) => {
        this.departements = data;  // Mettre à jour la liste des départements
      },
      error: (err) => {
        console.error('Erreur lors du chargement des départements :', err);
      }
    });
    
  }

  // Ouvre le modal de confirmation de suppression
  onDelete(departement: Departement, template: TemplateRef<any>): void {
    this.departementToDelete = departement;
    this.modalRef = this.modalService.open(template, { centered: true });
  }

  // Méthode qui Confirme la suppression
  confirmDelete(): void {

      this.departementService.deleteDepartement(this.departementToDelete.id).subscribe({
        next: (data) => {
          this.modalRef.close();
          this.loadDepartements();  // Recharge la liste des départements après la suppression
          this.afficherToast("Département supprimé avec succès.",'S');
        },
        error: (err) => {
          this.modalRef.close();
          this.afficherToast("Département non supprimé car il y a des projets qui y sont affectés.",'W'); 
        }
      });
  }

  afficherToast(message: string, type:string) {
    if (type=='S')
        this.toastr.success(message, '', {
          timeOut: 3000,          // Durée en millisecondes
          positionClass: 'toast-top-left',  // Position du toast
          toastClass : 'green',
        });
    else
    this.toastr.warning(message, '', {
      timeOut: 3000,          // Durée en millisecondes
      positionClass: 'toast-top-left',  // Position du toast
      toastClass : 'red',
    });
  }

  // Ouvre le modal d'édition
  onEdit(departement: Departement, template: TemplateRef<any>): void {
    this.dept = departement;
    this.modalRef2 = this.modalService.open(template, { centered: true });
    this.errorMessage = ''; // Réinitialisez le message d'erreur
  }

  // Méthode qui confirme l'édition un département
  confirmEdit() {
    this.departementService.editDepartement(this.dept).subscribe({
      next: (response) => {
        this.loadDepartements();
        this.afficherToast("Département mis à jour avec succès.",'S');
        this.modalRef2.close();
      },
      error: (err) => {
        this.errorMessage = err.message; // Récupérez l'erreur renvoyée par le service
        console.error('Erreur lors de la mise à jour du département', err);
      }
      
  });
  this.errorMessage = ''; // Réinitialisez le message d'erreur
  }

  // Ouvre le modal après la récupération des projets
  onGetProjets(departement: Departement, template: TemplateRef<any>): void {
    this.projets = [];
    this.departementService.getProjetsForDept(departement.id).subscribe({
      next: (response) => {
        this.projets = response;  // Mettre à jour la liste des projets du département
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets :', err);
      }
    });
    this.modalRef3 = this.modalService.open(template, { centered: true, size: 'lg' });
  }

  //appel du modal d'ajout de département
  onAdd(template: TemplateRef<any>): void {
    this.modalRef4 = this.modalService.open(template, { centered: true });
    this.errorMessage = ''; // Réinitialisez le message d'erreur
  }

  // Méthode qui confirme l'ajout d'un département
  confirmAdd() {
    this.departementService.addDepartement(this.deptA).subscribe({
      next: (response) => {
        this.loadDepartements();
        this.afficherToast("Département ajouté avec succès.",'S');
        this.modalRef4.close();
      },
      error: (err) => {
        this.errorMessage = err.message; // Récupérez l'erreur renvoyée par le service
        console.error('Erreur lors de la mise à jour du département', err);
      }    
  });
  this.errorMessage = ' '; // Réinitialisez le message d'erreur
  this.deptA = { nom: '' };
  }

  onSearchDepartements(key:string): void {
    this.departementService.searchDepartements(key).subscribe({
      next: (data) => {
        this.departements = data;  // Mettre à jour la liste des départements
      },
      error: (err) => {
        this.departements=[];
        console.error('Erreur lors du chargement des départements :', err);
      }
    });
  }

}//fin OnInit

