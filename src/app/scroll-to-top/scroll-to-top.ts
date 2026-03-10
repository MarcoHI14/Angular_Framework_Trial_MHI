import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.html',
  styleUrls: ['./scroll-to-top.css']
})
export class ScrollToTopComponent implements OnInit {
  isVisible = false;

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 120;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
