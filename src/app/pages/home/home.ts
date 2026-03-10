import { Component } from '@angular/core';
import { Hero } from '../../hero/hero';
import { About } from '../../about/about';
import { AttractionsComponent } from '../../attractions/attractions';
import { Gallery } from '../../gallery/gallery';
import { Info } from '../../info/info';
import { MiniPlayerComponent } from '../../mini-player/mini-player';
import { PlayerComponent } from '../../player/player';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, AttractionsComponent, Gallery, Info, MiniPlayerComponent, PlayerComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
