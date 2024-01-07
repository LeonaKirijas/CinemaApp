import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceOfOneMovie } from '../../data-of-one-movie.service';
import { catchError, take } from 'rxjs/operators';
import {  of } from 'rxjs';
@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css'
})
export class ShowMovieComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute,private dataService: DataServiceOfOneMovie) { }

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe(params => {
      const movieId = params['id'];
      this.dataService.fetchData(movieId).pipe(
        catchError(error => {
          console.error('Error fetching data: ', error);
          return of(null); // or handle the error appropriately
        })
      ).subscribe(
        (responseData) => {
          this.movie = responseData;
        }
      );
    });
  }
  
}

