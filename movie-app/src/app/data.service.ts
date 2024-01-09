import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'c6b671301fcb12108debb7c69ce2b3cc';
  private searchTerms = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  setSearchTerm(term: string) {
    this.searchTerms.next(term);
  }

  getSearchTerm() {
    return this.searchTerms.asObservable();
  }
  fetchGenres(): Observable<any> {
    const url = `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
  fetchData(page: number = 1, searchTerm?: string, genreId?: number): Observable<any> {
    let url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    if (searchTerm) {
      url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(searchTerm)}&page=${page}`;
    } else if (genreId) {
      url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`;
    }
    return this.http.get(url);
  }  
  
}
