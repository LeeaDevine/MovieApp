import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormGroup, Validators } from '@angular/forms';
// import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  constructor(private movieService: MovieService) {}

  searchForm: FormGroup = new FormGroup('', [Validators.required]);
  movies: any[] = [];

  //Submitted Form
  onSubmit(): void {
    console.log(this.searchForm);

    // this.searchMovies(value);
  }
}
