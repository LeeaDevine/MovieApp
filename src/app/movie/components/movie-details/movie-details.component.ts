import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import {
  Movie,
  UserSubscriptions,
  WatchProvider,
} from '../../models/movie.model';
import { SubscriptionsService } from '../../../account/services/subscriptions.service';
import { AuthService } from '../../../auth/service/auth.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  watchProviders: WatchProvider[] | null = null;
  userSubscriptions!: UserSubscriptions | null;
  loading = false;

  // mapping
  providerKeyMapping: { [key: string]: keyof UserSubscriptions } = {
    Netflix: 'netflix',
    'Sky Go': 'skyGo',
    'Now TV': 'nowTV',
    'Amazon Video': 'amazonVideo',
    'Disney Plus': 'disneyPlus',
  };

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private subscriptionService: SubscriptionsService,
    private authService: AuthService
  ) {}

  /**
   * @description on intialise - load related content.
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

    // get userid -> user Subscriptions
    this.authService
      .getCurrentUserId()
      .pipe(
        switchMap((userId) => {
          if (userId) {
            return this.subscriptionService.getSubscriptions(userId);
          } else {
            return of(null); //handle case when userid is null
          }
        })
      )
      .subscribe((subscriptions) => {
        this.userSubscriptions = subscriptions;
      });
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
        this.watchProviders = providers.results['GB']?.flatrate || [];
        console.log('Flatrate providers for GB:', this.watchProviders);
      },
      error: (error) => console.error('Error fetching watch providers', error),
    });
  }

  /**
   * @description get watch provider logo for services
   * @param path
   * @returns
   */
  getProviderLogoUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  /**
   * @description Get poster url which will show poster for each movie
   * @param posterPath
   * @returns
   */
  getPosterImageUrl(posterPath: string): string {
    if (this.movie!.poster_path) {
      return this.movieService.getPosterImageUrl(posterPath);
    } else {
      // Return Filler Poster [poster_path not available.]
      return '/assets/na-poster.png';
    }
  }

  /**
   * @description using map get provider_name associated with available User subscriptions
   * @param providerName
   * @returns
   */
  getSubscriptionStatus(providerName: string): boolean {
    // Normalize or map providerName to the key used in userSubscriptions
    const key = this.providerKeyMapping[providerName];
    return this.userSubscriptions ? this.userSubscriptions[key] : false;
  }
}
