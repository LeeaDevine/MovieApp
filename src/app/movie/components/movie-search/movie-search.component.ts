import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent implements OnInit {
  // Testing
  movies: any[] = [];

  movie: any;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  // On initialise
  ngOnInit(): void {
    this.searchMovies('Rocky');
  }

  // Method - Search Movies
  searchMovies(query: string): void {
    this.movieService.searchMovies(query).subscribe({
      next: (response) => {
        this.movies = response.results;
        console.log(response.results);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Movies search complete'),
    });
  }

  getPosterUrl(path: string): string {
    const imageUrl = `https://image.tmdb.org/t/p/w500${path}`;
    return imageUrl;
  }
}
