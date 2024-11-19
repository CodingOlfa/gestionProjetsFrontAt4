import { Departement } from "./Departement";
import { Employe } from "./Employe";

export interface Projet {
  id: number;
  nom: string;
  dateDebut: string; // Utiliser une chaîne de caractères pour la date
  dateFin: string;
  departement: Departement;
  employes: Employe[];
}
