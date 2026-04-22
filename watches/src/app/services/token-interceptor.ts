import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const toExclude ="/login";
  if(req.url.search(toExclude) === -1) {
    let jwt = authService.getToken();
    let reqWithToken=req.clone({
      setHeaders: {Authorization: 'Bearer ' + jwt}
    })
    return next(reqWithToken);
  }
  return next(req);
};
