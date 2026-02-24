import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Ejemplo} from './ejemplo/ejemplo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Ejemplo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-framework-trial');
}
