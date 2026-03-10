import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FAQOption {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class ChatbotComponent {
  isOpen = false;
  messages: Message[] = [];
  userInput = '';
  isTyping = false;

  faqs: FAQOption[] = [
    {
      question: '🕐 ¿Cuál es el horario del parque?',
      answer: 'Estamos abiertos de lunes a viernes de 10:00 a 20:00, y sábados y domingos de 10:00 a 22:00. Los horarios pueden variar según la temporada.'
    },
    {
      question: '🎫 ¿Cuánto cuestan las entradas?',
      answer: 'Entrada general: 25€, Niños (3-12 años): 15€, Seniors (+65): 18€, Menores de 3 años: Gratis. ¡Compra online y ahorra hasta un 20%!'
    },
    {
      question: '🚗 ¿Cómo llegar al parque?',
      answer: 'Estamos en Avda. de Tivoli, s/n, 29620 Torremolinos, Málaga. Disponemos de parking gratuito. También puedes llegar en autobús líneas M-110 y M-111.'
    },
    {
      question: '♿ ¿Es accesible para personas con movilidad reducida?',
      answer: 'Sí, todas nuestras instalaciones son accesibles. Disponemos de rampas, ascensores y sillas de ruedas gratuitas (previa reserva).'
    },
    {
      question: '🍔 ¿Hay restaurantes en el parque?',
      answer: 'Sí, tenemos 5 restaurantes y 8 puntos de comida rápida. También puedes traer tu propia comida (zonas de picnic disponibles).'
    },
    {
      question: '📞 ¿Cómo contacto con atención al cliente?',
      answer: 'Llámanos al +34 952 05 70 16 (9:00-21:00) o escríbenos a info@tivoliworld.es. ¡Respondemos en menos de 24h!'
    }
  ];

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.addBotMessage('¡Hola! 👋 Soy el asistente virtual de Tivoli World. ¿En qué puedo ayudarte?');
      setTimeout(() => {
        this.addBotMessage('Selecciona una pregunta o escribe tu consulta:');
      }, 800);
    }
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.messages.push({
        text: this.userInput,
        isUser: true,
        timestamp: new Date()
      });

      const input = this.userInput.toLowerCase();
      this.userInput = '';

      this.isTyping = true;
      setTimeout(() => {
        this.handleResponse(input);
        this.isTyping = false;
      }, 1000);
    }
  }

  selectFAQ(faq: FAQOption): void {
    this.messages.push({
      text: faq.question,
      isUser: true,
      timestamp: new Date()
    });

    this.isTyping = true;
    setTimeout(() => {
      this.addBotMessage(faq.answer);
      this.isTyping = false;
    }, 1000);
  }

  private handleResponse(input: string): void {
    let response = '';

    if (input.includes('horario') || input.includes('hora')) {
      response = this.faqs[0].answer;
    } else if (input.includes('precio') || input.includes('entrada') || input.includes('cuanto')) {
      response = this.faqs[1].answer;
    } else if (input.includes('llegar') || input.includes('direccion') || input.includes('donde')) {
      response = this.faqs[2].answer;
    } else if (input.includes('accesible') || input.includes('silla') || input.includes('discapacidad')) {
      response = this.faqs[3].answer;
    } else if (input.includes('comer') || input.includes('restaurante') || input.includes('comida')) {
      response = this.faqs[4].answer;
    } else if (input.includes('contacto') || input.includes('telefono') || input.includes('email')) {
      response = this.faqs[5].answer;
    } else {
      response = 'Interesante pregunta. Para consultas más específicas, puedes contactarnos en +34 952 05 70 16 o info@tivoliworld.es. ¿Hay algo más en lo que pueda ayudarte?';
    }

    this.addBotMessage(response);
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text,
      isUser: false,
      timestamp: new Date()
    });
  }
}

