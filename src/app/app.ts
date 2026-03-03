import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Ejemplo} from './ejemplo/ejemplo';
import {Hero} from './hero/hero';
import {About} from './about/about';
import {AttractionsComponent} from './attractions/attractions';
import {Gallery} from './gallery/gallery';
import {Info} from './info/info';
import {Footer} from './footer/footer';
import {PlayerComponent} from './player/player';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Ejemplo, Hero, About, AttractionsComponent, Gallery, Info, Footer, PlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-framework-trial');
}
