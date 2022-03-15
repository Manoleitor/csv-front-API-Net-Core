import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { FileCsvComponent } from './components/home/file-csv/file-csv.component';
import { UploadFileComponent } from './components/home/file-csv/upload-file/upload-file.component';
import { DataTableComponent } from './components/home/file-csv/data-table/data-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus,  faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ListCsvComponent } from './components/home/list-csv/list-csv.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    UploadFileComponent,
    DataTableComponent,
    FileCsvComponent,
    ListCsvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    library.add(faPlus, faFileCsv);
  }
 }
