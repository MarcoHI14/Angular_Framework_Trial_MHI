import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class TimelineComponent {
  events: TimelineEvent[] = [
    {
      year: 1972,
      title: 'Inauguración',
      description: 'Abre sus puertas como el primer parque temático de Andalucía.',
      icon: '🎪'
    },
    {
      year: 1985,
      title: 'Montaña Rusa',
      description: 'Inaugura la icónica montaña rusa, símbolo del parque.',
      icon: '🎢'
    },
    {
      year: 1995,
      title: 'Expansión',
      description: 'Se añaden nuevas atracciones y zonas temáticas.',
      icon: '🏗️'
    },
    {
      year: 2005,
      title: 'Modernización',
      description: 'Sistema de colas virtual y entrada digital.',
      icon: '💻'
    },
    {
      year: 2015,
      title: 'Zona Familiar',
      description: 'Atracciones para niños y familias.',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      year: 2024,
      title: '52 Años',
      description: 'Celebramos 5 décadas de entretenimiento.',
      icon: '✨'
    }
  ];
}

