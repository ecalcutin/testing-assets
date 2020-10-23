import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Invoice {
  readonly id: string;
  readonly value: number;
  readonly date: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dataSource = [];
  displayedColumns = ['id', 'ammount', 'duedate']

  constructor(private http: HttpClient) {
    this.http.get(`http://localhost:4000/data`).subscribe((data: any) => {
      this.dataSource = data
    })
  }

  ngOnInit(): void {
  }

}
