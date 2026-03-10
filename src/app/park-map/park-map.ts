import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Zone {
  id: string;
  name: string;
  color: string;
  attractions: string[];
  services: string[];
  icon: string;
}

@Component({
  selector: 'app-park-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './park-map.html',
  styleUrl: './park-map.css'
})
export class ParkMapComponent {
  selectedZone: Zone | null = null;

  zones: Zone[] = [
    {
      id: 'thrill',
      name: 'Zona Adrenalina',
      color: '#c8102e',
      icon: '🎢',
      attractions: ['Shambala', 'Tornado', 'Sky Screamer'],
      services: ['Restaurante Extremo', 'Taquillas', 'Primeros Auxilios']
    },
    {
      id: 'family',
      name: 'Zona Familiar',
      color: '#28a745',
      icon: '🎠',
      attractions: ['Fun House', 'Carrusel Mágico', 'Tren del Oeste'],
      services: ['Cafetería Familiar', 'Zona de lactancia', 'Baños']
    },
    {
      id: 'water',
      name: 'Zona Acuática',
      color: '#17a2b8',
      icon: '💦',
      attractions: ['Aquática', 'Toboganes', 'Splash Zone'],
      services: ['Vestuarios', 'Alquiler de toallas', 'Snack Bar']
    },
    {
      id: 'kids',
      name: 'Zona Infantil',
      color: '#ffd200',
      icon: '🧒',
      attractions: ['Mini Cars', 'Barcos Piratas', 'Globos Voladores'],
      services: ['Zona de juegos', 'Baños familiares', 'Heladería']
    },
    {
      id: 'central',
      name: 'Plaza Central',
      color: '#6c757d',
      icon: '🏛️',
      attractions: ['Teatro', 'Shows en vivo', 'Zona de descanso'],
      services: ['Información', 'Cajeros', 'Tienda de recuerdos', 'Restaurantes']
    }
  ];

  selectZone(zone: Zone): void {
    this.selectedZone = zone;
  }

  closeInfo(): void {
    this.selectedZone = null;
  }
}

