import { Component, AfterViewInit, inject } from '@angular/core';
import { ScrollAnimationService } from '../services/scroll-animation.service';
import { CounterComponent } from '../counter/counter';

@Component({
  selector: 'app-about',
  imports: [CounterComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);

  ngAfterViewInit() {
    this.scrollAnimationService.observeElements('.feature');
  }
}
