import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchData().pipe(
      catchError(error => {
        console.error('Error fetching data: ', error);
        return of([]); // or handle the error appropriately
      })
    ).subscribe(
      (responseData) => {
        this.data = responseData;
      }
    );
  }
}
