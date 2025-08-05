import { Routes } from '@angular/router';
import { Urls } from '../shared/enum/url.enum';
import { MainInterfaceComponentComponent } from './main-interface-component/main-interface-component.component';
import { AuthenticationComponentComponent } from './authentication-component/authentication-component.component';
import { mainPageGuard } from '../shared/guard/main-page.guard';

export const routes: Routes = [
  {
    path: Urls.main,
    component: MainInterfaceComponentComponent,
    canActivate: [mainPageGuard],
  },
  { path: Urls.auth, component: AuthenticationComponentComponent },
  { path: Urls.login, component: AuthenticationComponentComponent },
  { path: '**', redirectTo: Urls.login },
];
