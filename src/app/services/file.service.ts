import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileTxt } from '../models/FileTxt';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _httpClient: HttpClient) { }

  public getFiles(): Observable<FileTxt[]> {
    return this._httpClient.get<FileTxt[]>("https://localhost:44348/api/TxtFile")
    .pipe(
      map((res: FileTxt[]) => {return res;})
    ,catchError((err, caught) => {
      console.log(err);
      let s: Subject<FileTxt[]> = new Subject;
      s.next([]);
      return s;      
    })
    );
  }

  public getFile(id: number): Observable<FileTxt> {
    let queryParams = new HttpParams();
    queryParams.append("id", id);
    return this._httpClient.get<FileTxt>("https://localhost:44348/api/TxtFile", {params:queryParams})
    .pipe(
      map((res: FileTxt) => {return res;})
    ,catchError((err, caught) => {
      console.log(err);
      let s: Subject<FileTxt> = new Subject;
      s.next(new FileTxt("",""));
      return s;      
    })
    );
  }

  public postFileTxt(fileTxt: FileTxt): Observable<number>{
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    let options= { headers: headers};
    return this._httpClient.post<number>("https://localhost:44348/api/TxtFile", fileTxt, options)
    .pipe(
      map((res : number)=> {
        return res;}
        ));
  }

  public downLoadFile(csvTxt: string, name: string, type:string){
    //create element for download
    let file = new Blob([csvTxt], {type: type});    
    let element = document.createElement('a');
    const fileName = name;
    const url = URL.createObjectURL(file);    
    element.download = fileName;
    element.href = url;

    //send download
    document.body.appendChild(element);
    element.click();

    //clean element
    setTimeout(function(){
      document.body.removeChild(element);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

}
