import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('auth')) {
    return next(req);
  }

  const jwtToken = localStorage.getItem('token');

  if (!jwtToken) {
    return next(req);
  }

  const tokenUser = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
  });

  return next(tokenUser);
};
