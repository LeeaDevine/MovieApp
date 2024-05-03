import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  // Global variables.
  searchForm: FormGroup;
  movies: Movie[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  // error messages
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  // Loading spinner
  loading = false;

  onSubmit() {
    this.loading = true;
    // Extract the movie title from the form control
    const movieTitle = this.searchForm.get('title')?.value;

    // Check if movieTitle exists
    if (movieTitle) {
      this.searchMovies(movieTitle, 1);
    } else {
      console.error('Issue with searchMovies');
    }

    // reset error message
    this.errorMessage = '';
    this.loading = false;
  }

  /**
   * @description Search for Movie
   * @param title string
   * @param page number
   */
  searchMovies(title: string, page: number) {
    if (title) {
      // Use the movie service to perform the search
      this.movieService.searchMovies(title, page).subscribe({
        next: (data) => {
          // bind variables to results from search
          this.movies = data.results;
          this.totalPages = data.total_pages;
          this.currentPage = data.page;

          if (this.movies.length === 0) {
            this.errorMessage =
              'No results found for your search. Please try a different input.';
          }
        },
        error: (error) => {
          // TODO: Handle any errors that occur during the search
          console.error('Error fetching the results', error);
          this.errorMessage =
            'An error occurred while searching. Please try again.';
        },
      });
    }
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  changePage(page: number) {
    this.loading = true;
    const movieTitle = this.searchForm.get('title')?.value;
    // Check title, and page status
    if (
      movieTitle &&
      page !== this.currentPage &&
      page > 0 &&
      page <= this.totalPages
    ) {
      //
      this.currentPage = page;
      this.searchMovies(movieTitle, page);
    }
    this.loading = false;
  }

  getInputRequiredError() {
    if (this.searchForm.controls['title'].hasError('required')) {
      return 'Movie title is required.';
    }
    return '';
  }
}
