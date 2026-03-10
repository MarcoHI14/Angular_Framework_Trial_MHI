import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; icon: string }[];
}

interface Recommendation {
  name: string;
  zone: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planner.html',
  styleUrl: './planner.css'
})
export class PlannerComponent {
  currentStep = 0;
  answers: { [key: string]: string } = {};
  showPlan = false;
  itinerary: Recommendation[] = [];

  questions: Question[] = [
    {
      id: 'companion',
      question: '¿Con quién visitas el parque?',
      options: [
        { value: 'family', label: 'En familia', icon: '👨‍👩‍👧‍👦' },
        { value: 'couple', label: 'En pareja', icon: '💑' },
        { value: 'friends', label: 'Con amigos', icon: '👥' },
        { value: 'solo', label: 'Solo/a', icon: '🧍' }
      ]
    },
    {
      id: 'time',
      question: '¿Cuánto tiempo tienes?',
      options: [
        { value: 'halfday', label: 'Medio día', icon: '⏰' },
        { value: 'fullday', label: 'Día completo', icon: '🌅' },
        { value: 'evening', label: 'Solo tarde', icon: '🌆' }
      ]
    },
    {
      id: 'preference',
      question: '¿Qué tipo de atracciones prefieres?',
      options: [
        { value: 'thrill', label: 'Adrenalina', icon: '🎢' },
        { value: 'family', label: 'Familiares', icon: '🎠' },
        { value: 'water', label: 'Acuáticas', icon: '💦' },
        { value: 'all', label: 'De todo', icon: '🎪' }
      ]
    }
  ];

  selectOption(value: string): void {
    this.answers[this.questions[this.currentStep].id] = value;
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    } else {
      this.generatePlan();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  generatePlan(): void {
    this.itinerary = this.getRecommendations();
    this.showPlan = true;
  }

  getRecommendations(): Recommendation[] {
    const baseItems: Recommendation[] = [];

    // Añadir según preferencias
    if (this.answers['preference'] === 'thrill' || this.answers['preference'] === 'all') {
      baseItems.push({ name: 'Shambala', zone: 'Zona Adrenalina', time: '10:00', icon: '🎢' });
      baseItems.push({ name: 'Tornado', zone: 'Zona Extrema', time: '11:30', icon: '🌪️' });
    }

    if (this.answers['preference'] === 'family' || this.answers['preference'] === 'all') {
      baseItems.push({ name: 'Fun House', zone: 'Zona Familiar', time: '12:00', icon: '🏰' });
      baseItems.push({ name: 'Carrusel Mágico', zone: 'Zona Familiar', time: '14:00', icon: '🎠' });
    }

    if (this.answers['preference'] === 'water' || this.answers['preference'] === 'all') {
      baseItems.push({ name: 'Aquática', zone: 'Zona Acuática', time: '13:00', icon: '💦' });
    }

    if (this.answers['companion'] === 'family') {
      baseItems.push({ name: 'Parque Infantil', zone: 'Zona Kids', time: '15:30', icon: '🧒' });
    }

    // Siempre incluir comida
    baseItems.push({ name: 'Pausa para comer', zone: 'Área de restaurantes', time: '13:30', icon: '🍔' });

    // Limitar según tiempo disponible
    const limit = this.answers['time'] === 'halfday' ? 3 : this.answers['time'] === 'evening' ? 4 : 6;

    return baseItems.sort((a, b) => a.time.localeCompare(b.time)).slice(0, limit);
  }

  restart(): void {
    this.currentStep = 0;
    this.answers = {};
    this.showPlan = false;
    this.itinerary = [];
  }

  savePlan(): void {
    localStorage.setItem('tivoliPlan', JSON.stringify({
      answers: this.answers,
      itinerary: this.itinerary,
      date: new Date().toISOString()
    }));
    alert('✅ Plan guardado! Podrás consultarlo más tarde.');
  }
}

