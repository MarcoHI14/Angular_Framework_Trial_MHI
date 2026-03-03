import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-modal.html',
  styleUrls: ['./gallery-modal.css']
})
export class GalleryModalComponent {
  @Input() images: Array<{ title: string; url: string }> = [];
  @Input() isOpen = false;
  @Input() currentIndex = 0;
  @Output() close = new EventEmitter<void>();

  get currentImage() {
    return this.images[this.currentIndex];
  }

  closeModal() {
    this.close.emit();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeModal();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight() {
    if (this.isOpen) this.nextImage();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft() {
    if (this.isOpen) this.previousImage();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }
}

