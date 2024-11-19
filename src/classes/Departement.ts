import { Projet } from "./Projet";
export interface Departement {
  id: number;
  nom: string;
  projets: Projet[];
}
