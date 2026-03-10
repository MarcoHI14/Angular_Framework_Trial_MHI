import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isScrolled = false;
  isMenuOpen = false;
  isDarkMode = false;

  private themeService = inject(ThemeService);
  private router = inject(Router);

  constructor() {
    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeMenu();
    window.scrollTo(0, 0);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }
}

