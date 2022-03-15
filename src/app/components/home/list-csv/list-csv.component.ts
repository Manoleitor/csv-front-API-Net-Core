import { Component, OnInit } from '@angular/core';
import { FileTxt } from 'src/app/models/FileTxt';
import { FileService } from 'src/app/services/file.service';
import { faPlus,  faFileCsv, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-csv',
  templateUrl: './list-csv.component.html',
  styleUrls: ['./list-csv.component.scss']
})
export class ListCsvComponent implements OnInit {

  //for icon
  faFileCsv = faFileCsv;

  //list to show in cards
  fileList : FileTxt[] = [];

  constructor(private _fileService: FileService) { }

  ngOnInit(): void {
    this.getFileList();
  }

  public downLoadFile(fileTxt: FileTxt){
    let txt = atob(fileTxt.base64);
    if(txt[0] == "{")
      txt = txt.substring(1);
    
    if(txt[txt.length -1] == "}")
      txt.slice(0, -1);

    this._fileService.downLoadFile(atob(fileTxt.base64), fileTxt.name+".csv", "text/plain");
  }

  private getFileList()
  {
    this._fileService.getFiles().subscribe(res=>this.fileList = res);
  }

}
