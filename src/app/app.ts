import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  constructor(public authService: Auth,
              private router: Router) { }

   ngOnInit() {
    this.authService.loadToken();
    const isOnLogin = this.router.url === '/login';
    if (!isOnLogin && (!this.authService.getToken() || this.authService.isTokenExpired())) {
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
