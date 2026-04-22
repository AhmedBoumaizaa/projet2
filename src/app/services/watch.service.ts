import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Watch } from '../modele/watches.model';
import { Modele } from '../modele/modele.model';
import { ModeleWrapper } from '../modele/modeleWrapped.model';
import { Auth } from './auth'; // ✅ inject Auth to get token

@Injectable({ providedIn: 'root' })
export class WatchService {

  apiURL: string = 'http://localhost:8083/watches/api';
  apiURLSec = 'http://localhost:8083/entreprises/sec';
  apiURLMod: string = 'http://localhost:8083/watches/models';

  constructor(private http: HttpClient, private authService: Auth) {} 

 
  getAuthHeaders(): HttpHeaders {
    let jwt = this.authService.getToken(); 
    return new HttpHeaders({ 'Authorization': 'Bearer ' + jwt });
}

  listeWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(this.apiURL);
  }

  ajouterWatch(ent: Watch): Observable<Watch> {
    return this.http.post<Watch>(this.apiURL, ent,
      { headers: this.getAuthHeaders() });
  }

  consulterWatch(id: number): Observable<Watch> {
    return this.http.get<Watch>(`${this.apiURL}/${id}`,
      { headers: this.getAuthHeaders() });
  }

  updateWatch(ent: Watch): Observable<Watch> {
    return this.http.put<Watch>(this.apiURL, ent,
      { headers: this.getAuthHeaders() });
  }

  supprimerWatch(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`,
      { headers: this.getAuthHeaders() });
  }

  listeModele(): Observable<ModeleWrapper> {
    return this.http.get<ModeleWrapper>(this.apiURLMod,
      { headers: this.getAuthHeaders() });
  }

  ajouterModele(mod: Partial<Modele>): Observable<Modele> {
    return this.http.post<Modele>(this.apiURLMod, mod,
      { headers: this.getAuthHeaders() });
  }

  updateModele(mod: Modele): Observable<Modele> {
    return this.http.put<Modele>(`${this.apiURLMod}/${mod.idModel}`, mod,
      { headers: this.getAuthHeaders() });
  }

  rechercherWatchParNom(nom: string): Observable<Watch[]> {
    const url = `http://localhost:8083/watches/rest/watches/search/findByNomWatchContains?nom=${nom}`;
    return this.http.get<{_embedded: {watches: Watch[]}}>(url, { headers: this.getAuthHeaders() })
      .pipe(map(res => res._embedded.watches));
  }

  rechercherWatchParModele(idModel: number): Observable<Watch[]> {
    return this.http.get<Watch[]>(this.apiURL + '/watchesmodel/' + idModel,
      { headers: this.getAuthHeaders() });
  }
}