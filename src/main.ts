import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
 providers: [provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()]  // Add HttpClient provider here
}).catch(err => console.error(err));