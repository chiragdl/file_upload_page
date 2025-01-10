import { Component } from '@angular/core';
import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SingleFileUploadComponent] // Remove RouterOutlet if not used
})
export class AppComponent {
  title = 'file-upload-app';
}