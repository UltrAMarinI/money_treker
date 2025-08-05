import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const mainPageGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  // Проверяем, что код выполняется в браузере
  if (isPlatformBrowser(platformId)) {
    return !!localStorage.getItem('token');
  }

  return false; // Если не в браузере, запрещаем доступ
};
