import { Component, signal } from '@angular/core';
import {Hero} from './hero/hero';
import {About} from './about/about';
import {AttractionsComponent} from './attractions/attractions';
import {Gallery} from './gallery/gallery';
import {Info} from './info/info';
import {Footer} from './footer/footer';
import {NavbarComponent} from './navbar/navbar';
import {ScrollToTopComponent} from './scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-root',
  imports: [Hero, About, AttractionsComponent, Gallery, Info, Footer, NavbarComponent, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-framework-trial');
}
