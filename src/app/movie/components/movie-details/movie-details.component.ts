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
  movie: Movie | null = null;

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
      console.log(id);

      this.loadMovieDetails(id);
    });
  }

  /**
   * @description Load movies from id
   * @param id
   */
  loadMovieDetails(id: number): void {
    this.movieService.getMovieDetails(id).subscribe({
      next: (response: Movie) => {
        console.log(response);

        this.movie = response;
      },
      error: (error) => {
        console.error('Error fetching movie details', error);
      },
    });
  }

  getPosterImageUrl(posterPath: string): string {
    return this.movieService.getPosterImageUrl(posterPath);
  }
}
