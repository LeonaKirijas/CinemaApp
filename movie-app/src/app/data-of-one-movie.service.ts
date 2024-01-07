import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceOfOneMovie {
  private apiUrl = 'https://api.themoviedb.org/3/movie/';
  private apiKey = 'c6b671301fcb12108debb7c69ce2b3cc';

  constructor(private http: HttpClient) { }

  
  fetchData(movieId:any): Observable<any> {
    const url = `${this.apiUrl}/${movieId}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
