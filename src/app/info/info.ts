import { Component, AfterViewInit, inject } from '@angular/core';
import { ScrollAnimationService } from '../services/scroll-animation.service';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class Info implements AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);

  ngAfterViewInit() {
    this.scrollAnimationService.observeElements('.info-card');
  }
}
