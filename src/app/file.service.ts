import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000/files'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) {}

  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}