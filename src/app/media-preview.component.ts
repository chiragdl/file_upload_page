import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilesPreviewComponent } from './files-preview.component';

@Component({
  selector: 'app-media-preview-dialog',
  template: `
    <div class="dialog-content">
      <span class="close-btn" (click)="dialogRef.close()">×</span>
      <img [src]="files[currentIndex].preview" class="popup-image">
      <div class="popup-buttons">
        <button mat-raised-button color="primary" (click)="prevImage()" [disabled]="currentIndex === 0">Previous</button>
        <button mat-raised-button color="warn" (click)="deleteImage()">Delete</button>
        <button mat-raised-button color="primary" (click)="nextImage()" [disabled]="currentIndex === files.length - 1">Next</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule]
})
export class MediaPreviewDialogComponent {
  currentIndex: number;
  files: any[];

  constructor(
    public dialogRef: MatDialogRef<MediaPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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

  deleteImage() {
    this.files.splice(this.currentIndex, 1);
    if (this.files.length === 0) {
      this.dialogRef.close();
    } else if (this.currentIndex === this.files.length) {
      this.currentIndex--;
    }
  }
}

@Component({
  selector: 'app-media-preview',
  template: `
    <div class="container">
      <h2>Upload Media Files</h2>
      <button mat-raised-button color="primary" (click)="fileInput.click()">
        Choose Files
      </button>
      <input
        #fileInput
        type="file"
        (change)="handleFileSelection($event)"
        multiple
        accept="image/*"
        style="display: none"
      >

      <div *ngIf="selectedFiles.length > 0">
        <h3>Selected Files Preview</h3>
        <div class="file-gallery">
          <div *ngFor="let preview of filePreviews; let i = index" class="file-item">
            <img [src]="preview" class="file-preview" *ngIf="preview">
            <button mat-raised-button color="warn" (click)="removeFile(i)">Delete</button>
          </div>
        </div>
        <button mat-raised-button color="primary" (click)="uploadFiles()">
          Upload Files
        </button>
      </div>

      <div *ngIf="uploadStatus" class="status-message">
        {{ uploadStatus }}
      </div>

      <app-files-preview></app-files-preview>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, FilesPreviewComponent]
})
export class MediaPreviewComponent implements OnInit {
  selectedFiles: File[] = [];
  filePreviews: (string | ArrayBuffer | null)[] = [];
  uploadStatus: string = '';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  handleFileSelection(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = [...this.selectedFiles, ...files];
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreviews.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }

  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      this.uploadStatus = 'Please select files to upload';
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    this.uploadStatus = 'Uploading...';
    this.http.post('http://localhost:3000/upload', formData)
      .subscribe({
        next: (response) => {
          this.uploadStatus = 'Files uploaded successfully!';
          this.selectedFiles = [];
          this.filePreviews = [];
        },
        error: (error) => {
          this.uploadStatus = 'Error uploading files. Please try again.';
          console.error('Upload error:', error);
        }
      });
  }
}