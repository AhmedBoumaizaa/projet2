import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';


export const watchGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(Auth);
  const router = inject(Router);

  
  if (authService.isAdmin())
    return true;
  else {
    router.navigate(['app-forbidden']);
    return false;
  }

};