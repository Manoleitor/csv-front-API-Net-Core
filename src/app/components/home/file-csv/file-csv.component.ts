import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-csv',
  templateUrl: './file-csv.component.html',
  styleUrls: ['./file-csv.component.scss']
})
export class FileCsvComponent implements OnInit {

  data: string[][] | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  receiveData($event: string[][])
  {
    this.data = $event;
  }
}
