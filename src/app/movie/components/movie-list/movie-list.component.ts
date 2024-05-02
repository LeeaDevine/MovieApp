import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  trending: Movie[] = [];
  upcoming: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadTrendingMovies();
    this.loadUpcomingMovies();
  }

  loadTrendingMovies(): void {
    this.movieService.getTrendingMovies().subscribe({
      next: (movies) => {
        console.log(movies);

        this.trending = movies;
      },
      error: (error) => {
        console.error('Error fetching trending movies:', error);
      },
    });
  }

  loadUpcomingMovies(): void {
    this.movieService.getUpcomingMovies().subscribe({
      next: (movies) => {
        this.upcoming = movies;
      },
      error: (error) => {
        console.error('Error fetching trending movies:', error);
      },
    });
  }
}
