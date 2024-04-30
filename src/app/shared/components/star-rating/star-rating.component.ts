import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent implements OnChanges {
  @Input()
  rating: number | undefined;
  fullStars: number = 0;
  halfStar: boolean = false;
  emptyStars: number = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  updateStars(): void {
    // this.stars = Array(5).fill(false);
    // const fullStars = this.rating ? Math.round(this.rating / 2) : 0;
    // for (let i = 0; i < fullStars; i++) {
    //   this.stars[i] = true;
    // }
    // Ensure rating has a default value of 0 if it's undefined
    const safeRating = this.rating ?? 0;

    // Calculate full stars as before
    this.fullStars = Math.floor(safeRating / 2);

    // Check if there is a half star, safeRating can only be a number now, so no need for optional chaining
    this.halfStar = safeRating % 1 !== 0;

    // Calculate empty stars
    this.emptyStars = 5 - this.fullStars - (this.halfStar ? 1 : 0);
  }
}
