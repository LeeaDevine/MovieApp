import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrl: './movie-review.component.scss',
})
export class MovieReviewComponent implements OnInit {
  @Input()
  movieId!: number;
  reviews$!: Observable<any>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    if (this.movieId) {
      this.loadReviews(this.movieId);
    } else {
      console.error('Movie ID is undefined or null');
    }
  }

  // MovieReviewComponent
  public loadReviews(id: number): void {
    this.reviews$ = this.movieService.getMovieReviews(id);
  }
}
