import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  watchProviders: any | null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  /**
   * @description On initialise
   */
  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const id = params['id'];

      // Check for id
      if (id) {
        this.loadMovieDetails(id);
        this.loadWatchProviders(id);
      } else {
        console.error('Invalid ID - something went wrong');
      }
    });
    this.loading = false;
  }

  /**
   * @description Get Movie Details [movie id]
   * @param id
   */
  loadMovieDetails(id: number): void {
    this.movieService.getMovieDetails(id).subscribe({
      next: (response: Movie) => {
        this.movie = response;
      },
      error: (error) => {
        console.error('Error fetching movie details', error);
      },
    });
  }

  /**
   * @description Load watch providers from movie service.
   * @param id
   */
  loadWatchProviders(id: number): void {
    this.movieService.getMovieWatchProviders(id).subscribe({
      next: (providers) => {
        this.watchProviders = providers.results?.['GB']?.flatrate;
        console.log('Flatrate providers for GB:', this.watchProviders);
      },
      error: (error) => console.error('Error fetching watch providers', error),
    });
  }

  getProviderLogoUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  getPosterImageUrl(posterPath: string): string {
    if (this.movie!.poster_path) {
      return this.movieService.getPosterImageUrl(posterPath);
    } else {
      // Return Filler Poser [poster_path not available.]
      return '/assets/na-poster.png';
    }
  }
}
