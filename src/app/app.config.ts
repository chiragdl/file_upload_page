import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
//import { ImageGridComponent } from './image-grid/image-grid.component'; // Adjust the path as necessary

@NgModule({
  declarations: [
    AppComponent, // Add your component here
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }