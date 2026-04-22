import { Modele } from "./modele.model";


export class Watch {
  idEnt!: number;
  nomEnt!: string;
  modele?: Modele;       
  chiffreAff!: number; 
  dateCre!: Date;
  email!: string;
}
