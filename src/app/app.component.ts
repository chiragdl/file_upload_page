import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SingleFileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-upload-app';
}
