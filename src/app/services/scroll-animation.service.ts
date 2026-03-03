import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {

  observeElements(selector: string): void {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('scroll-animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Esperar a que el DOM esté listo
    setTimeout(() => {
      document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }
}

