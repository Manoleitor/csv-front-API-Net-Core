/*
  falta pulir cosas de la interfaz, como que pase de un campo editable al siguiente cuando se pulsa el tabulador
  o que al crear un nuevo campo se puedan llenar los valores nuevos más fácil
  corregir el margen derecho con las css
*/import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus,  faFileCsv, faSave } from '@fortawesome/free-solid-svg-icons';
import { FileTxt } from 'src/app/models/FileTxt';
import { CsvParserService } from 'src/app/services/csv-parser.service';
import { FileService } from 'src/app/services/file.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  //data for table, received from parent, FileCsvComponent
  @Input() tableData: string[][] | null = null;

  //icons
  faSave = faSave;
  faPlus = faPlus;
  faFileCsv = faFileCsv;

  //editing table
  creatingColumn : boolean = false;
  editingTable : boolean = false; 
  tmpColumn: string[] = [];
  newValueInputFieldId : string = "newValue";
  fieldToEdit: number[] = [-1, -1];

  //regex patter for inputs
  pattern: string = "[a-zA-Z0-9\n ]+";

  constructor(private _csvParserService: CsvParserService, private _fileService: FileService, private _datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  public addColumnClick(){
    this.creatingColumn = true;
    this.editingTable = true;
    this.createColumn();
  }

  public addRow()
  {
    const numColumns = this.tableData != null ? this.tableData[0].length : -1;
    if (numColumns > -1)
    {
      let newRow = [];
      for (let i = 0; i < numColumns; i++) {
        newRow.push("");
      }
      this.tableData?.push(newRow);
    }
  }

  public changeValueField(i:number, j:number, value: string){
    if(this.tableData != null)
      this.tableData[i][j] = value;

    this.fieldToEdit[0] = -1;
    this.fieldToEdit[1] = -1;
  }

  public editingField(i: number, j: number)
  {
    this.fieldToEdit[0] = i;
    this.fieldToEdit[1] = j;
  }

  public onKeyDown(event: KeyboardEvent)
  {
    if (!this.isAlphanumeric(event.key))
      event.preventDefault();
  }

  public saveColumnClick(){
    const tableLength = this.tableData != null ? this.tableData.length : 0;
    for(let i = 0; i < tableLength; i++)
    {
      if(this.tableData != null)
        this.tableData[i].push(this.tmpColumn[i]);
    }
    this.tmpColumn = [];
    this.editingTable = false;
    this.creatingColumn = false;
  }

  public saveField(index: number){
    const input= <HTMLInputElement>document.querySelector('#newValue'+index)
    this.tmpColumn[index] = input.value;
  }

  public isAlphanumeric(str: string) : boolean{
    let regExp = new RegExp(this.pattern);
    let output = regExp.test(str);
    return output;
  }

  public isEditingField(i:number, j:number)
  {
    if (this.fieldToEdit[0] == i && this.fieldToEdit[1] == j)
      return true;
    return false;
  }

  public isLastRowEmpty(): boolean
  {
    const arrLength = this.tableData != null ? this.tableData.length : -1;
    let output = true;
    if (arrLength > 1 && this.tableData != null)
    {
      this.tableData[arrLength - 1].forEach(field=>{
        if(field != '')
          output = false;
      })
    }
    return output;
  }

  private createColumn()
  {
    this.tableData?.forEach(row=>{
      this.tmpColumn.push("");
    });
  }

  public makeCsv(){
    //make a string from the table array, using a service
    const csvTxt = this._csvParserService.makeCsvFromArray(this.tableData);

    this.sendFileTxtToAPI(csvTxt);
    this.downLoadCsvFile(csvTxt);
  }

  private sendFileTxtToAPI(csvTxt: string){
    const fileTxt = new FileTxt("csv"+this._datePipe.transform(Date.now(),"MMM dd Y HH:mm:ss"), btoa(csvTxt));

    this._fileService.postFileTxt(fileTxt).subscribe(res=>{
      if(res == 1){
        console.log("added");
      }else{
        console.log("failed to add " + res!= undefined ? res : "undefined");
      }
    });
  }

  private downLoadCsvFile(csvTxt:string)
  {
    this._fileService.downLoadFile(csvTxt, "PruebaTecnica.csv", 'text/plain');
  }
}
