import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  isQrOpen = false;

  openQr(): void {
    this.isQrOpen = true;
  }

  closeQr(): void {
    this.isQrOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeQr();
  }
}
