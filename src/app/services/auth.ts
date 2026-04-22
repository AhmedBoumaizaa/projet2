import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class Auth {

  apiURL: string = 'http://localhost:8081/users';
  token!: string;
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];

  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    let roles: string[] = [];
    let username = credentials.username.toLowerCase();

    if (credentials.password === '123') {
      if (username === 'admin' || username === 'editeur') {
        roles = ['ADMIN'];
      } else if (username === 'client' || username === 'user' || username === 'nadhem') {
        roles = ['USER'];
      }
    }

    if (roles.length > 0) {
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify({ sub: username, roles: roles, exp: Math.floor(Date.now() / 1000) + (60 * 60) }));
      const signature = "fake_signature";
      const fakeJwt = `${header}.${payload}.${signature}`;

      const response = new HttpResponse({
        headers: new HttpHeaders({ 'Authorization': fakeJwt }),
        status: 200,
        body: null
      });
      return of(response);
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  saveToken(jwt: string) {
    if (!jwt) {
      console.error('saveToken: received null/undefined token — check backend CORS (Access-Control-Expose-Headers: Authorization)');
      return;
    }
    // remove "Bearer " prefix before storing
    const cleanToken = jwt.startsWith('Bearer ') ? jwt.substring(7) : jwt;
    localStorage.setItem('jwt', cleanToken);
    this.token = cleanToken;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken() {
    const stored = localStorage.getItem('jwt');
    if (stored) {
      this.token = stored;
      this.isloggedIn = true;
      this.decodeJWT();
    }
  }

  getToken(): string {
    return this.token;
  }

  isTokenExpired(): Boolean {
    if (!this.token) return true;
    return this.helper.isTokenExpired(this.token);
  }

  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0 || this.roles.indexOf('ROLE_ADMIN') >= 0;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}