import { Modele } from "./modele.model";


export class Watch {
  idWatch!: number;
  nomWatch!: string;
  nomModel?: string;
  model?: Modele;
  prixWatch!: number; 
  dateCreation!: Date;
}
