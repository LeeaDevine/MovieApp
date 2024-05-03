import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { MovieReview } from '../../models/movie.model';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrl: './movie-review.component.scss',
})
export class MovieReviewComponent {
  private _movieId!: number;

  @Input()

  // Set Movie id
  set movieId(id: number) {
    this._movieId = id;
    if (id) {
      this.loadReviews(id);
    }
  }

  // Get Movie id
  get movieId(): number {
    return this._movieId;
  }

  // Reviews
  reviews$!: Observable<MovieReview[]>;

  constructor(private movieService: MovieService) {}

  // MovieReviewComponent
  public loadReviews(id: number): void {
    this.reviews$ = this.movieService.getMovieReviews(id);
  }
}
