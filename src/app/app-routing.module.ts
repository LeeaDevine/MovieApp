import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './movie/components/movie-search/movie-search.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

// Pass in routes to be used throughout the app.
const routes: Routes = [
  { path: '', component: MovieSearchComponent },
  // Other routes?...

  // Wildcard - 404 error
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
