import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideNativeDateAdapter } from '@angular/material/core';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideNativeDateAdapter()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
