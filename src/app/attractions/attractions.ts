import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../services/scroll-animation.service';
import { ReviewsService } from '../services/reviews.service';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  type: string;
}

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attractions.html',
  styleUrls: ['./attractions.css']
})
export class AttractionsComponent implements AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);
  reviewsService = inject(ReviewsService);

  attractions: Attraction[] = [
    {
      id: 1,
      name: 'Aquática',
      description: 'Refréscate en nuestra zona acuática con toboganes y piscinas',
      image: 'assets/images/Aquatica.jpg',
      type: 'Acuática'
    },
    {
      id: 2,
      name: 'Fun House',
      description: 'La casa de la risa con espejos deformantes y sorpresas',
      image: 'assets/images/FunHouse.png',
      type: 'Familiar'
    },
    {
      id: 3,
      name: 'Shambala',
      description: 'Una montaña rusa emocionante con vistas espectaculares',
      image: 'assets/images/Shambala.jpg',
      type: 'Adrenalina'
    }
  ];

  selectedAttraction: Attraction | null = null;
  showReviews = false;

  ngAfterViewInit() {
    this.scrollAnimationService.observeElements('.attraction-card');
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalf) {
      stars.push('⯨');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars;
  }

  openReviews(attraction: Attraction): void {
    this.selectedAttraction = attraction;
    this.showReviews = true;
  }

  closeReviews(): void {
    this.showReviews = false;
    this.selectedAttraction = null;
  }

  likeReview(reviewId: number): void {
    this.reviewsService.likeReview(reviewId);
  }
}

