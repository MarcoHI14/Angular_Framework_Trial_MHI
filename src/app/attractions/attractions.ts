import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Attraction {
  name: string;
  description: string;
  image: string;
  type: string;
}

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attractions.html',
  styleUrls: ['./attractions.css']
})
export class AttractionsComponent {
  attractions: Attraction[] = [
    {
      name: 'Aquática',
      description: 'Refréscate en nuestra zona acuática con toboganes y piscinas',
      image: 'assets/images/Aquatica.jpg',
      type: 'Acuática'
    },
    {
      name: 'Fun House',
      description: 'La casa de la risa con espejos deformantes y sorpresas',
      image: 'assets/images/FunHouse.png',
      type: 'Familiar'
    },
    {
      name: 'Shambala',
      description: 'Una montaña rusa emocionante con vistas espectaculares',
      image: 'assets/images/Shambala.jpg',
      type: 'Adrenalina'
    }
  ];
}

