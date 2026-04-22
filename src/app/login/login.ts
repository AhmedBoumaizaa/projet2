import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login implements OnInit {
  err: number = 0;
  errMsg: string = '';
  user = { username: '', password: '' };

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit(): void {}

  onLoggedin() {
    this.err = 0;
    this.errMsg = '';
    console.log("Attempting login with", this.user);
    this.authService.login(this.user).subscribe({
      next: (data) => {
        console.log("Login success response:", data);
        const jwToken = data.headers.get('Authorization')
                     || data.headers.get('authorization');
        if (jwToken) {
          console.log("Token found:", jwToken);
          this.authService.saveToken(jwToken);
          this.router.navigate(['/liste-watches']);
        } else {
          console.error("No token found in response headers. Headers:", data.headers.keys());
          this.err = 1;
          this.errMsg = "Token missing in response. Check backend CORS.";
        }
      },
      error: (err) => {
        console.error("Login failed with error:", err);
        this.err = 1;
        this.errMsg = err.message || "Unknown error";
      }
    });
  }
}