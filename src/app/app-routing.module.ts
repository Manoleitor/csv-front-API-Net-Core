import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileCsvComponent } from './components/home/file-csv/file-csv.component';
import { ListCsvComponent } from './components/home/list-csv/list-csv.component';

const routes: Routes = [
  {path: 'fileCsv', component:FileCsvComponent},
  {path: 'listCsv', component:ListCsvComponent},
  { path: '', redirectTo: '/fileCsv', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
