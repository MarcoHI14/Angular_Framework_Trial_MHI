import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-attractions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="attractions-grid">
      <div class="skeleton-card" *ngFor="let _ of [0,1,2]">
        <div class="skeleton skeleton-image"></div>
        <div class="card-content">
          <div class="skeleton skeleton-text" style="width: 80%;"></div>
          <div class="skeleton skeleton-text" style="width: 100%;"></div>
          <div class="skeleton skeleton-text" style="width: 90%;"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .attractions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .skeleton-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    }

    .skeleton-image {
      width: 100%;
      height: 250px;
    }

    .card-content {
      padding: 25px;
    }

    .skeleton-text {
      margin-bottom: 12px;
    }
  `]
})
export class SkeletonAttractionsComponent {}
