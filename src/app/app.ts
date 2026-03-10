import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { Footer } from './footer/footer';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top';
import { ChatbotComponent } from './chatbot/chatbot';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Footer, ScrollToTopComponent, ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-framework-trial');
}
