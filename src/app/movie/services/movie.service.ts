import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiURL = 'https://api.themoviedb.org/3'; //moviedb base url
  private apiKey = environment.apiKey; //Get API key from environment file.

  constructor(private http: HttpClient) {}
}
