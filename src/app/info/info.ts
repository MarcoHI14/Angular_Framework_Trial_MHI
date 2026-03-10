import { Component, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollAnimationService } from '../services/scroll-animation.service';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class Info implements AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);
  private router = inject(Router);

  ngAfterViewInit() {
    this.scrollAnimationService.observeElements('.info-card');
  }

  goToBookingSection() {
    this.router.navigate(['/planificacion-reserva'], { fragment: 'booking-section' });
  }
}
