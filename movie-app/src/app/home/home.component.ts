import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  data: any;
  filteredData: any;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.fetchData().pipe(
      catchError(error => {
        console.error('Error fetching data: ', error);
        return of([]);
      })
    ).subscribe(
      (responseData) => {
        this.data = responseData;
        this.filteredData = responseData.results; // Set initial data here
      }
    );

    this.dataService.getSearchTerm().subscribe(term => {
      this.filterData(term);
    });
  }

  filterData(searchTerm: string) {
    if (!searchTerm) {
      this.filteredData = this.data.results; // Reset to initial data if search term is empty
      return;
    }
    this.filteredData = this.data.results.filter((movie: { original_title: string; }) => 
      movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  navigateToShowMovie(movie: any) {
    this.router.navigate(['info', movie.id]);
  }
}
