import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: Movie;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  getPosterImageUrl(posterPath: string): string {
    if (this.movie.poster_path) {
      return this.movieService.getPosterImageUrl(posterPath);
    } else {
      // Return Filler Poser [poster_path not available.]
      return '/assets/na-poster.png';
    }
  }
}
