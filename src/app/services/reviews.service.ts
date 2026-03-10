import { Injectable } from '@angular/core';

export interface Review {
  id: number;
  attractionId: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviews: Review[] = [
    { id: 1, attractionId: 1, author: 'María G.', rating: 5, date: '2024-02-15', comment: '¡Increíble experiencia! La montaña rusa es espectacular.', likes: 24 },
    { id: 2, attractionId: 1, author: 'Carlos M.', rating: 4, date: '2024-02-10', comment: 'Muy divertida, aunque las colas son largas en temporada alta.', likes: 15 },
    { id: 3, attractionId: 2, author: 'Ana P.', rating: 5, date: '2024-02-20', comment: 'Mis hijos lo pasaron genial. Perfecto para familias.', likes: 32 },
    { id: 4, attractionId: 2, author: 'Roberto L.', rating: 5, date: '2024-02-18', comment: 'Zona muy bien cuidada, monitores atentos y amables.', likes: 18 },
    { id: 5, attractionId: 3, author: 'Laura S.', rating: 4, date: '2024-02-12', comment: 'Buena relación calidad-precio. Comida rica y variada.', likes: 21 },
    { id: 6, attractionId: 1, author: 'Pedro R.', rating: 5, date: '2024-01-28', comment: 'La mejor atracción del parque sin duda.', likes: 45 }
  ];

  getReviewsByAttraction(attractionId: number): Review[] {
    return this.reviews.filter(r => r.attractionId === attractionId);
  }

  getAverageRating(attractionId: number): number {
    const attractionReviews = this.getReviewsByAttraction(attractionId);
    if (attractionReviews.length === 0) return 0;
    const sum = attractionReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / attractionReviews.length) * 10) / 10;
  }

  getReviewCount(attractionId: number): number {
    return this.getReviewsByAttraction(attractionId).length;
  }

  likeReview(reviewId: number): void {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      review.likes++;
    }
  }
}

