import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const mainPageGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // Проверяем, что код выполняется в браузере
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      // Перенаправляем на страницу аутентификации
      router.navigate(['/authentication']);
      return false;
    }
  }

  // На сервере (SSR) возвращаем false и не делаем навигацию
  // Router на сервере может быть недоступен
  return false;
};
