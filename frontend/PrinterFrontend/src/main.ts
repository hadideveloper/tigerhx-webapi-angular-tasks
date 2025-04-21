import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { licenseKey } from './devextreme-license';
import { provideAnimations } from '@angular/platform-browser/animations';


if (typeof window !== 'undefined') {
  (window as any).DevExpress = {
    ...((window as any).DevExpress || {}),
    config: {
      ...((window as any).DevExpress?.config || {}),
      licenseKey
    }
  };
}


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    provideAnimations()
  ]
}).catch(err => console.error(err));
