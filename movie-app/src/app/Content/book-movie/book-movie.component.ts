import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceOfOneMovie } from '../../data-of-one-movie.service';
import { catchError, take } from 'rxjs/operators';
import {  of } from 'rxjs';
import * as emailjs from 'emailjs-com';
import { UserService } from '../../user.service';

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
  userEmail: string | null = null; // User email variable

  constructor(private route: ActivatedRoute,private dataService: DataServiceOfOneMovie,private userService: UserService) { }

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
      this.userService.userEmail$.subscribe(email => {
        this.userEmail = email;
      });
      emailjs.init("FgL9xHozGgoXpcPZh"); // Initialize emailjs
    });
   const seatsInFirstRow = 4;
    const seatsInOtherRows = 5;

    this.seatsGrouped.push(this.seats.slice(0, seatsInFirstRow));

    for (let i = seatsInFirstRow; i < this.seats.length; i += seatsInOtherRows) {
      this.seatsGrouped.push(this.seats.slice(i, i + seatsInOtherRows));
    }
    emailjs.init("FgL9xHozGgoXpcPZh");
  }
   selectSeat(seatNumber: number) {
    // Toggle the selected state of the seat
    if (this.selectedSeats.includes(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      this.selectedSeats.push(seatNumber);
    }
  }
  sendEmail() {
    if (!this.userEmail) {
      console.error('User email not available');
      return;
    }

    const templateParams = {
      user_name: this.userEmail, // Assuming you have the user's name
      user_email: this.userEmail, // The user's email
      movie_title: this.movie.title, // Assuming you have the movie's title
      seats_booked: this.selectedSeats.join(", "), // Assuming you have the selected seats
      total_amount: this.calculateTotalAmount()
    };

    emailjs.send('Movie-Booking', 'template_0pxo2mf', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  }
  

  calculateTotalAmount(): number {
    // Assuming each seat costs 200 MKD
    return this.selectedSeats.length * 200;
  }
 
}