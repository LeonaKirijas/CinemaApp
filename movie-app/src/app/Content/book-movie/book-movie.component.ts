import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceOfOneMovie } from '../../data-of-one-movie.service';
import { catchError, take } from 'rxjs/operators';
import {  of } from 'rxjs';
@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrl: './book-movie.component.css'
})
export class BookMovieComponent implements OnInit {
  movie: any;
  seats: number[] = Array.from({ length: 23 }, (_, index) => index + 1);
  selectedSeats: number[] = [];
  seatsGrouped: number[][] = [];

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
   const seatsInFirstRow = 4;
    const seatsInOtherRows = 5;

    this.seatsGrouped.push(this.seats.slice(0, seatsInFirstRow));

    for (let i = seatsInFirstRow; i < this.seats.length; i += seatsInOtherRows) {
      this.seatsGrouped.push(this.seats.slice(i, i + seatsInOtherRows));
    }

  }
   selectSeat(seatNumber: number) {
    // Toggle the selected state of the seat
    if (this.selectedSeats.includes(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      this.selectedSeats.push(seatNumber);
    }
  }

  calculateTotalAmount(): number {
    // Assuming each seat costs 200 MKD
    return this.selectedSeats.length * 200;
  }
 
}