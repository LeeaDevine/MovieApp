import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiURL = 'https://api.themoviedb.org/3'; //moviedb base url
  private apiKey = environment.apiKey; //Get API key from environment file.

  constructor(private http: HttpClient) {}

  // Search for movies by title
  searchMovies(title: string): Observable<any> {
    const url = `${this.apiURL}/search/movie?api_key=${
      this.apiKey
    }&query=${encodeURIComponent(title)}`;
    return this.http.get(url);
  }

  // Get trending movies
  getTrendingMovies(): Observable<any> {
    const url = `${this.apiURL}/trending/movie/day?api_key=${this.apiKey}`;
    return this.http
      .get<{ results: Movie[] }>(url)
      .pipe(map((response) => response.results));
  }

  // Get upcoming movies
  getUpcomingMovies(): Observable<any> {
    const url = `${this.apiURL}/movie/upcoming?api_key=${this.apiKey}&region=GB`;
    return this.http
      .get<{ results: Movie[] }>(url)
      .pipe(map((response) => response.results));
  }

  // Get a specific movie by ID
  getMovieDetails(id: number): Observable<any> {
    const url = `${this.apiURL}/movie/${id}?api_key=${this.apiKey}`;
    return this.http.get<Movie>(url);
  }

  //Get Poster Image
  getPosterImageUrl(posterPath: string): string {
    const imageUrlPrefix = 'https://image.tmdb.org/t/p/w500';
    return `${imageUrlPrefix}${posterPath}`;
  }
}
