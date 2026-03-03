import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModalComponent } from '../gallery-modal/gallery-modal';
import { ScrollAnimationService } from '../services/scroll-animation.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, GalleryModalComponent],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);

  isModalOpen = false;
  currentImageIndex = 0;

  images = [
    { title: 'Aquática', url: 'assets/images/Aquatica.jpg' },
    { title: 'Fun House', url: 'assets/images/FunHouse.png' },
    { title: 'Shambala', url: 'assets/images/Shambala.jpg' },
    { title: 'Burger Shack', url: 'assets/images/Burger-Shack.jpg' },
    { title: 'Tivoli World', url: 'assets/images/Tivoli.png' },
    { title: 'Momentos Especiales', url: 'assets/images/portada.jpg' }
  ];

  ngAfterViewInit() {
    this.scrollAnimationService.observeElements('.gallery-item');
  }

  openModal(index: number) {
    this.currentImageIndex = index;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
