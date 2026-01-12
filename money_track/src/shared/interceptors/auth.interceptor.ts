import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  if (req.url.includes('auth')) {
    return next(req);
  }

  if (isPlatformBrowser(platformId)) {
    try {
      const jwtToken = localStorage.getItem('token');
      
      if (jwtToken) {
        const tokenUser = req.clone({
          setHeaders: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        return next(tokenUser);
      }
    } catch (error) {
      console.warn('localStorage недоступен', error);
    }
  }
  
  return next(req);
};