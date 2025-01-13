// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { MediaPreviewDialogComponent } from './media-preview.component';

// @Component({
//   selector: 'app-files-preview',
//   template: `
//     <h2>All Files</h2>
// <div class="file-gallery">
//   <div *ngFor="let file of files; let i = index" class="file-item" [ngClass]="{'more-images': i === 3 && files.length > 4}">
//     <img *ngIf="i < 4" [src]="file.preview" class="file-preview" (click)="openImageDialog(i)">
//     <div *ngIf="i === 3 && files.length > 4" class="more-overlay" (click)="openImageDialog(i)">
//       <span>+{{ files.length - 4 }}</span>
//     </div>
//   </div>
// </div>
//   `,
//   standalone: true,
//   imports: [CommonModule, MatButtonModule, MatDialogModule]
// })
// export class FilesPreviewComponent implements OnInit {
//   files: { preview: string; fileName: string; url: string }[] = [];

//   constructor(
//     private http: HttpClient,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit() {
//     this.fetchFiles();
//   }

//   fetchFiles() {
//     this.http.get<{
//       currentPage: string;
//       totalPages: number;
//       totalFiles: number;
//       filesPerPage: number;
//       files: { fileName: string; url: string }[];
//     }>('http://localhost:3000/files')
//     .subscribe({
//       next: (response) => {
//         if (Array.isArray(response.files)) {
//           this.files = response.files.map(file => ({
//             preview: file.url,
//             fileName: file.fileName,
//             url: file.url
//           }));
//         } else {
//           console.error('API response does not contain an array of files:', response);
//         }
//       },
//       error: (err) => {
//         console.error('Error fetching files:', err);
//       }
//     });
//   }

//   openImageDialog(index: number) {
//     this.dialog.open(MediaPreviewDialogComponent, {
//       width: '90%',
//       maxWidth: '1200px',
//       data: {
//         files: this.files,
//         currentIndex: index
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MediaPreviewDialogComponent } from './media-preview.component';

@Component({
  selector: 'app-files-preview',
  template: `
    <h2>All Files</h2>
    <div class="file-gallery">
      <div *ngFor="let file of displayedFiles; let i = index" 
           class="file-item">
        <img [src]="file.preview" 
             class="file-preview" 
             (click)="openImageDialog(i)"
             [alt]="file.fileName">
        <div *ngIf="i === 3 && files.length > 4" 
             class="more-overlay" 
             (click)="openImageDialog(i)">
          <span>+{{ files.length - 4 }}</span>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule]
})
export class FilesPreviewComponent implements OnInit {
  files: { preview: string; fileName: string; url: string }[] = [];
  displayedFiles: { preview: string; fileName: string; url: string }[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchFiles();
  }

  fetchFiles() {
    this.http.get<{
      currentPage: string;
      totalPages: number;
      totalFiles: number;
      filesPerPage: number;
      files: { fileName: string; url: string }[];
    }>('http://localhost:3000/files')
    .subscribe({
      next: (response) => {
        if (Array.isArray(response.files)) {
          this.files = response.files.map(file => ({
            preview: file.url,
            fileName: file.fileName,
            url: file.url
          }));
          // Only show first 4 files in the grid
          this.displayedFiles = this.files.slice(0, 4);
        } else {
          console.error('API response does not contain an array of files:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching files:', err);
      }
    });
  }

  openImageDialog(index: number) {
    this.dialog.open(MediaPreviewDialogComponent, {
      width: '90%',
      maxWidth: '1200px',
      data: {
        files: this.files, // Pass all files to allow navigation through all images
        currentIndex: index
      }
    });
  }
}