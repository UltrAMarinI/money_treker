import { provideServerRendering } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { provideNativeDateAdapter } from '@angular/material/core';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideNativeDateAdapter()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
