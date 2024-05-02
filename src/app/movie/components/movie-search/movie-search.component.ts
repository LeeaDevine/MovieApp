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
  noResultsMessage: string = '';

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

    // Check if movieTitle exists
    if (movieTitle) {
      this.searchMovies(movieTitle, 1);
    } else {
      console.error('Issue with searchMovies');
    }

    // reset error message
    this.noResultsMessage = '';
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
            this.noResultsMessage =
              'No results found for your search. Please try a different input.';
          }
        },
        error: (error) => {
          // TODO: Handle any errors that occur during the search
          console.error('Error fetching the results', error);
        },
      });
    }
  }

  changePage(page: number) {
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
  }
}
