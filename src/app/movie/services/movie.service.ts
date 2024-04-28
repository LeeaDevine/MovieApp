import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiURL = 'https://api.themoviedb.org/3';
  private apiKey = enviroment.apiKey; //Get API key from environment file.
  private region = 'GB'; //Target UK region only

  constructor(private http: HttpClient) {}

  query = '';

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiURL}/search/movie?api_key=${
      this.apiKey
    }&query=${encodeURIComponent(query)}&region=GB`;

    // Return results
    return this.http.get(url);
  }

  // Test - get movies for moviedb api call
  getTrendingMovies() {
    return this.http.get(
      `${this.apiURL}/trending/movies/day?api_key=${this.apiKey}&region=${this.region}`
    );
  }
}
