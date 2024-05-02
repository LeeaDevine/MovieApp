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

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  /**
   * @description On initialise
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      // Check for id
      if (id) {
        this.loadMovieDetails(id);
      } else {
        console.error('Invalid ID - something went wrong');
      }
    });
  }

  /**
   * @description Get Movie Details [movie id]
   * @param id
   */
  loadMovieDetails(id: number): void {
    this.movieService.getMovieDetails(id).subscribe({
      next: (response: Movie) => {
        console.log('API response:', response);
        this.movie = response;
      },
      error: (error) => {
        console.error('Error fetching movie details', error);
      },
    });
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
