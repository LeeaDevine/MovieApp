import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  trending: any[] = [];
  upcoming: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadTrendingMovies();
    this.loadUpcomingMovies();
  }

  loadTrendingMovies(): void {
    this.movieService.getTrendingMovies().subscribe({
      next: (response) => {
        this.trending = response.results;
      },
      error: (error) => {
        console.error('Error fetching trending movies:', error);
      },
    });
  }

  loadUpcomingMovies(): void {
    this.movieService.getUpcomingMovies().subscribe({
      next: (response) => {
        this.upcoming = response.results;
      },
      error: (error) => {
        console.error('Error fetching trending movies:', error);
      },
    });
  }

  getPosterImageUrl(posterPath: string): string {
    return this.movieService.getPosterImageUrl(posterPath);
  }
}
