import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    // Extract the movie title from the form control
    const movieTitle = this.searchForm.get('title')?.value;
    if (movieTitle) {
      // Use the movie service to perform the search
      this.movieService.searchMovies(movieTitle).subscribe({
        next: (results) => {
          // TODO: Handle the movie search results
          console.log(results);
        },
        error: (error) => {
          // TODO: Handle any errors that occur during the search
          console.error(error);
        },
      });
    }
  }
}
