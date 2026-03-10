import { Component } from '@angular/core';
import { Hero } from '../../hero/hero';
import { About } from '../../about/about';
import { AttractionsComponent } from '../../attractions/attractions';
import { Gallery } from '../../gallery/gallery';
import { Info } from '../../info/info';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, AttractionsComponent, Gallery, Info],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}

