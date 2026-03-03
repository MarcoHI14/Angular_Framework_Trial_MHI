import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-grid">
      <div class="skeleton-item" *ngFor="let _ of [0,1,2,3,4,5]">
        <div class="skeleton skeleton-image"></div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }

    .skeleton-item {
      border-radius: 15px;
      overflow: hidden;
    }

    .skeleton-image {
      width: 100%;
      aspect-ratio: 4/3;
    }
  `]
})
export class SkeletonGalleryComponent {}
