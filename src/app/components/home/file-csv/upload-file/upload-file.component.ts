import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CsvParserService } from 'src/app/services/csv-parser.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Output() dataEvent = new EventEmitter<string[][]>();

  constructor(private _CsvParserService: CsvParserService) { }

  ngOnInit(): void {
  }

  onFileChange(event:any) {  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = this._CsvParserService.parseCsv(file);

      this.dataEvent.emit(data);
    }
  }
}
