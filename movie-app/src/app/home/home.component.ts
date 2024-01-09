import { Component, HostListener, OnInit } from '@angular/core';
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
  currentPage: number = 1;
  genres: any[] = [];
  selectedGenre?: number;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.loadData();
    this.dataService.getSearchTerm().subscribe(term => {
      this.filterData(term);
    });

    this.dataService.fetchGenres().subscribe(
      response => {
        this.genres = response.genres;
        if (this.genres.length > 0) {
          this.selectedGenre = this.genres[0].id; // Set default to first genre
          this.loadData(); // Load data with default genre
        }
      },
      error => console.error('Error fetching genres:', error)
    );
  }

  
  loadData(page: number = 1, searchTerm?: string, genreId?: number) {
    this.dataService.fetchData(page, searchTerm, genreId).pipe(
      catchError(error => {
        console.error('Error fetching data: ', error);
        return of([]);
      })
    ).subscribe(
      (responseData) => {
        this.data = responseData;
        this.filteredData = responseData.results;
      }
    );
  } 
  updatePage(newPage: number) {
    this.currentPage = newPage;
    this.dataService.getSearchTerm().subscribe(term => {
      const genreId = this.selectedGenre;
      this.loadData(this.currentPage, term, genreId);
    });
  }


  onGenreChange() {
    this.currentPage = 1; // Reset to first page
    const genreId = this.selectedGenre ? this.selectedGenre : undefined;
    this.loadData(this.currentPage, undefined, genreId);
    this.updatePage(1);
  }


  nextPage() {
    this.updatePage(this.currentPage + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.updatePage(this.currentPage - 1);
    }
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

  showScrollButton = false;

@HostListener('window:scroll', ['$event'])
onWindowScroll() {
  this.showScrollButton = window.scrollY > 100; // Adjust 100 to the desired scroll threshold
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}

