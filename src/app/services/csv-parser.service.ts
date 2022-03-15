import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvParserService {
  constructor() { }

  public parseCsv(csvFile: File) : string[][]{
    const fileReader = new FileReader();

    //declare output
    let output: any[][] = [];

    //read and parse csv
    fileReader.readAsText(csvFile);
    fileReader.onloadend = (e) =>{
      const csv: any = fileReader.result;
      const allTextLines = this.getAllTextLinesFromFile(csv);  

      //Table Headings
      const headers = this.getDataHeaders(allTextLines);

      //Push headings to array variable
      output.push(headers);

      // Table Rows
      const body = this.getDataBody(allTextLines, headers);
      body.forEach(row => {
        output.push(row)
      });
    };

    return output;
  }

  public makeCsvFromArray(array:string[][] | null): string{
    //make the csv body
    if (array!= null){
      const csvTxt = this.makeBody(array);
      return csvTxt;
    }
    return "";
  }

  private makeLine(arrayStr : string[]): string
  {
    const output = arrayStr.join(";");
    return output;
  }

  private makeBody(array: string[][]) : string{
    let output = "";
    array.forEach(row =>{
      output = output + this.makeLine(row) + "\n";
    })
    return output;
  }

  private getAllTextLinesFromFile(result: string) : string[]
  {
    let output: string[] = [];
    let tmp = result.split(/\r|\n|\r/);
    tmp.forEach(row =>{
      if (row.trim() != "")
        output.push(row);
    })
    return output;
  }

  private getDataHeaders(allTextLines: string[]): string[]
  {
    return this.getHeaderRow(allTextLines[0]);
  }

  private getDataBody(allTextLines: string[], header: string[]): string[][]{
    let output:string[][] = [];

    let arrl = allTextLines.length;
    for (let i = 1; i < arrl; i++) {
      output.push(this.getRow(allTextLines[i], header));
    }

    return output;
  }

  private getRow(strRow: string, header: string[]): string[]
  {
    const numberOfColumns = header.length;
    let data = strRow.split(';');
    let output:string[] = [];

    for (let i = 0; i < numberOfColumns; i++) {
      output.push(data[i]);
    }

    return output;
  }

  private getHeaderRow(strHeaderRow: string): string[]{
    let data = strHeaderRow.split(';');
    let output:string[] = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i] != "")
      output.push(data[i]);
    }

    return output;
  }
  
}
