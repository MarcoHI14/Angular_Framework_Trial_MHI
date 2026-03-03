import { Component } from '@angular/core';
import { PlayerComponent } from "../player/player";

@Component({
  selector: 'app-hero',
  imports: [
    PlayerComponent
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

}
