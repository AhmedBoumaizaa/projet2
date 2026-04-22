import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Watch } from '../modele/watches.model';
import { Secteur } from '../modele/secteur.model';
import { SecteurWrapper } from '../modele/secteurWrapped.model';
import { Modele } from '../modele/modele.model';
import { ModeleWrapper } from '../modele/modeleWrapped.model';
import { Auth } from './auth'; // ✅ inject Auth to get token

@Injectable({ providedIn: 'root' })
export class WatchService {

  apiURL = 'http://localhost:8083/entreprises/api';
  apiURLSec = 'http://localhost:8083/entreprises/sec';
  apiURLMod = 'http://localhost:8083/entreprises/mod';

  constructor(private http: HttpClient, private authService: Auth) {} 

 
  getAuthHeaders(): HttpHeaders {
    let jwt = this.authService.getToken(); 
    return new HttpHeaders({ 'Authorization': 'Bearer ' + jwt });
}

  listeWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(this.apiURL+"/all");
  }

  ajouterWatch(ent: Watch): Observable<Watch> {
    return this.http.post<Watch>(`${this.apiURL}/addent`, ent,
      { headers: this.getAuthHeaders() });
  }

  consulterWatch(id: number): Observable<Watch> {
    return this.http.get<Watch>(`${this.apiURL}/getbyid/${id}`,
      { headers: this.getAuthHeaders() });
  }

  updateWatch(ent: Watch): Observable<Watch> {
    return this.http.put<Watch>(`${this.apiURL}/updateent`, ent,
      { headers: this.getAuthHeaders() });
  }

  supprimerWatch(id: number) {
    return this.http.delete(`${this.apiURL}/delent/${id}`,
      { headers: this.getAuthHeaders() });
  }

  listeSecteur(): Observable<SecteurWrapper> {
    return this.http.get<SecteurWrapper>(this.apiURLSec,
      { headers: this.getAuthHeaders() });
  }

  listeModele(): Observable<ModeleWrapper> {
    return this.http.get<ModeleWrapper>(this.apiURLMod,
      { headers: this.getAuthHeaders() });
  }

  ajouterSecteur(sec: Partial<Secteur>): Observable<Secteur> {
    return this.http.post<Secteur>(this.apiURLSec, sec,
      { headers: this.getAuthHeaders() });
  }

  updateSecteur(sec: Secteur): Observable<Secteur> {
    return this.http.put<Secteur>(`${this.apiURLSec}/${sec.idSec}`, sec,
      { headers: this.getAuthHeaders() });
  }

  ajouterModele(mod: Partial<Modele>): Observable<Modele> {
    return this.http.post<Modele>(this.apiURLMod, mod,
      { headers: this.getAuthHeaders() });
  }

  updateModele(mod: Modele): Observable<Modele> {
    return this.http.put<Modele>(`${this.apiURLMod}/${mod.idMod}`, mod,
      { headers: this.getAuthHeaders() });
  }

  rechercherWatchParNom(nom: string): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${this.apiURL}/entByName/${nom}`,
      { headers: this.getAuthHeaders() });
  }

  rechercherWatchParModele(idMod: number): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${this.apiURL}/entmod/${idMod}`,
      { headers: this.getAuthHeaders() });
  }
}