import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `<div class="counter">
    <div class="counter-value">{{ currentValue }}</div>
    <div class="counter-label">{{ label }}</div>
  </div>`,
  styles: [`
    .counter {
      text-align: center;
      padding: 20px;
    }

    .counter-value {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      color: #ffd200;
      line-height: 1;
      margin-bottom: 10px;
    }

    .counter-label {
      font-size: clamp(0.95rem, 2vw, 1.1rem);
      color: #ffffff;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.95;
    }
  `]
})
export class CounterComponent implements AfterViewInit {
  @Input() endValue: number = 0;
  @Input() label: string = '';
  @Input() duration: number = 2000;
  @Input() suffix: string = '';

  currentValue: string = '0';

  ngAfterViewInit() {
    // Esperar a que el componente sea visible en el viewport
    setTimeout(() => {
      this.animateCounter();
    }, 100);
  }

  animateCounter() {
    const startValue = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const currentValue = Math.floor(startValue + (this.endValue - startValue) * progress);

      if (this.endValue > 999) {
        // Formato con puntos separadores
        this.currentValue = currentValue.toLocaleString('es-ES') + this.suffix;
      } else {
        this.currentValue = currentValue + this.suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
