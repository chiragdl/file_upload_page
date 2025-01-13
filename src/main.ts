import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MediaPreviewComponent } from './app/media-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediaPreviewComponent],
  template: `
    <app-media-preview></app-media-preview>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideAnimations()
  ]
}).catch(err => console.error(err));