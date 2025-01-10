// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { map } from 'rxjs';

// @Component({
//   selector: 'app-single-file-upload',
//   templateUrl: './single-file-upload.component.html',
//   styleUrls: ['./single-file-upload.component.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class SingleFileUploadComponent {
//   selectedFiles: File[] = [];
//   filePreviews: (string | ArrayBuffer | null)[] = [];
//   uploadStatus: string = '';
//   files: {
//     preview: string; fileName: string, url: string 
// }[] = []; // Add this property
//   cachedImages: Map<string, string> = new Map();

//   constructor(private http: HttpClient) {}

//   handleFileSelection(event: any) {
//     this.selectedFiles = Array.from(event.target.files);
//     this.filePreviews = [];
//     this.selectedFiles.forEach(file => {
//       if (this.isImageFile(file)) {
//         const reader = new FileReader();
//         reader.onload = (e) => this.filePreviews.push(reader.result);
//         reader.readAsDataURL(file);
//       } else {
//         this.filePreviews.push(null);
//       }
//     });
//   }

//   isImageFile(file: File): boolean {
//     return file.type.startsWith('image/');
//   }

//   ngOnInit() {
//     this.fetchFiles();
//   }

//   uploadFiles() {
//     if (this.selectedFiles.length > 0) {
//       this.uploadStatus = 'inProgress';
//       const formData = new FormData();
//       this.selectedFiles.forEach(file => formData.append('file', file, file.name));

//       this.http.post('http://localhost:3000/upload', formData).subscribe({
//         next: () => {
//           this.uploadStatus = 'completed';
//           this.fetchFiles();
//         },
//         error: () => {
//           this.uploadStatus = 'error';
//         }
//       });
//     }
//   }

//   fetchFiles() {
//     this.http.get<{ files: { fileName: string, url: string }[] }>('http://localhost:3000/files').subscribe({
//       next: (response) => {
//         this.files = response.files.map(file => ({
//           ...file,
//           preview: this.cachedImages.get(file.url) || file.url
//         })); // Store the fetched files
//         console.log('Fetched files:', this.files);
//         this.files.forEach(file => {
//           file.preview = this.cachedImages.get(file.url) || file.url;
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching files:', error);
//       }
//     });
//   }

//   // // paginatation API in get:
//   // fetchFiles(page: number = 1, limit: number = 10) {
//   //   this.http.get<{ files: { fileName: string, url: string }[], totalItems: number }>(
//   //     `http://localhost:3000/files?page=${page}&limit=${limit}`
//   //   ).subscribe({
//   //     next: (response) => {
//   //       this.files = response.files.map(file => ({
//   //         ...file,
//   //         preview: this.cachedImages.get(file.url) || file.url
//   //       }));
//   //       console.log('Fetched files:', this.files);
//   //       // Additional logic to handle pagination metadata
//   //       const totalPages = Math.ceil(response.totalItems / limit);
//   //       console.log(`Page ${page} of ${totalPages}`);
//   //     },
//   //     error: (error) => {
//   //       console.error('Error fetching files:', error);
//   //     }
//   //   });
//   // }

// }

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { map } from 'rxjs';

// @Component({
//   selector: 'app-single-file-upload',
//   templateUrl: './single-file-upload.component.html',
//   styleUrls: ['./single-file-upload.component.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class SingleFileUploadComponent implements OnInit {
//   selectedFiles: File[] = [];
//   filePreviews: (string | ArrayBuffer | null)[] = [];
//   uploadStatus: string = '';
//   files: {
//     preview: string; fileName: string, url: string 
//   }[] = [];
//   cachedImages: Map<string, string> = new Map();
//   isPopupOpen: boolean = false;
//   currentImageIndex: number = 0;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchImages();
//   }

//   uploadFiles() {
//         if (this.selectedFiles.length > 0) {
//           this.uploadStatus = 'inProgress';
//           const formData = new FormData();
//           this.selectedFiles.forEach(file => formData.append('file', file, file.name));
    
//           this.http.post('http://localhost:3000/upload', formData).subscribe({
//             next: () => {
//               this.uploadStatus = 'completed';
//               this.fetchImages();
//             },
//             error: () => {
//               this.uploadStatus = 'error';
//             }
//           });
//         }
//       }

//       fetchImages() {
//         this.http.get<{ currentPage: string, totalPages: number, totalFiles: number, filesPerPage: number, files: { fileName: string, url: string }[] }>('http://localhost:3000/files')
//           .subscribe({
//             next: (response) => {
//               if (Array.isArray(response.files)) {
//                 this.files = response.files.map(file => ({
//                   preview: file.url,
//                   fileName: file.fileName,
//                   url: file.url
//                 }));
//               } else {
//                 console.error('API response does not contain an array of files:', response);
//               }
//             },
//             error: (err) => {
//               console.error('Error fetching images:', err);
//             }
//           });
//       }

//       handleFileSelection(event: any) {
//         this.selectedFiles = Array.from(event.target.files);
//         this.filePreviews = [];
//         this.selectedFiles.forEach(file => {
//           if (this.isImageFile(file)) {
//             const reader = new FileReader();
//             reader.onload = (e) => this.filePreviews.push(reader.result);
//             reader.readAsDataURL(file);
//           } else {
//             this.filePreviews.push(null);
//           }
//         });
//       }

//       isImageFile(file: File): boolean {
//         return file.type.startsWith('image/');
//       }

//       openImagePopup(index: number) {
//         this.currentImageIndex = index;
//         this.isPopupOpen = true;
//       }

//       closeImagePopup() {
//         this.isPopupOpen = false;
//       }

//       prevImage() {
//         if (this.currentImageIndex > 0) {
//           this.currentImageIndex--;
//         }
//       }

//       nextImage() {
//         if (this.currentImageIndex < this.files.length - 1) {
//           this.currentImageIndex++;
//         }
//       }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';

@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SingleFileUploadComponent implements OnInit {
  selectedFiles: File[] = [];
  filePreviews: (string | ArrayBuffer | null)[] = [];
  uploadStatus: string = '';
  files: {
    preview: string; fileName: string, url: string 
  }[] = [];
  cachedImages: Map<string, string> = new Map();
  isPopupOpen: boolean = false;
  currentImageIndex: number = 0;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchImages();
  }

  uploadFiles() {
        if (this.selectedFiles.length > 0) {
          this.uploadStatus = 'inProgress';
          const formData = new FormData();
          this.selectedFiles.forEach(file => formData.append('file', file, file.name));
    
          this.http.post('http://localhost:3000/upload', formData).subscribe({
            next: () => {
              this.uploadStatus = 'completed';
              this.fetchImages();
            },
            error: () => {
              this.uploadStatus = 'error';
            }
          });
        }
      }

  fetchImages() {
    this.http.get<{ currentPage: string, totalPages: number, totalFiles: number, filesPerPage: number, files: { fileName: string, url: string }[] }>('http://localhost:3000/files')
      .subscribe({
        next: (response) => {
          if (Array.isArray(response.files)) {
            this.files = response.files.map(file => ({
              preview: file.url,
              fileName: file.fileName,
              url: file.url
            }));
          } else {
            console.error('API response does not contain an array of files:', response);
          }
        },
        error: (err) => {
          console.error('Error fetching images:', err);
        }
      });
  }

  handleFileSelection(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.filePreviews = [];
    this.selectedFiles.forEach(file => {
      if (this.isImageFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => this.filePreviews.push(reader.result);
        reader.readAsDataURL(file);
      } else {
        this.filePreviews.push(null);
      }
    });
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  openImageDialog(index: number): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: {
        files: this.files,
        currentIndex: index
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }
}

@Component({
  selector: 'app-image-dialog',
  template: `
    <div class="dialog-content">
      <span class="close-btn" (click)="dialogRef.close()">&times;</span>
      <img [src]="files[currentIndex].preview" class="popup-image">
      <div class="popup-buttons">
        <button mat-raised-button color="primary" (click)="prevImage()" [disabled]="currentIndex === 0"><</button>
        <button mat-raised-button color="primary" (click)="nextImage()" [disabled]="currentIndex === files.length - 1">></button>
      </div>
    </div>
  `,
  styleUrls: ['./single-file-upload.component.css']
})
export class ImageDialogComponent {
  currentIndex: number;
  files: any[];

  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.files = data.files;
    this.currentIndex = data.currentIndex;
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.files.length - 1) {
      this.currentIndex++;
    }
  }
}
