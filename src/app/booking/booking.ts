import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent {
  selectedDate: string = '';
  minDate: string = '';

  ticketTypes: TicketType[] = [
    { id: 'adult', name: 'Adulto', price: 25, description: 'Mayores de 12 años' },
    { id: 'child', name: 'Niño', price: 15, description: '3-12 años' },
    { id: 'senior', name: 'Senior', price: 18, description: 'Mayores de 65 años' }
  ];

  quantities: { [key: string]: number } = {
    adult: 0,
    child: 0,
    senior: 0
  };

  showConfirmation = false;

  constructor() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.selectedDate = tomorrow.toISOString().split('T')[0];
  }

  increment(typeId: string): void {
    if (this.quantities[typeId] < 10) {
      this.quantities[typeId]++;
    }
  }

  decrement(typeId: string): void {
    if (this.quantities[typeId] > 0) {
      this.quantities[typeId]--;
    }
  }

  getSubtotal(): number {
    return this.ticketTypes.reduce((sum, type) =>
      sum + (type.price * this.quantities[type.id]), 0
    );
  }

  getOnlineDiscount(): number {
    return this.getSubtotal() * 0.20;
  }

  getTotal(): number {
    return this.getSubtotal() - this.getOnlineDiscount();
  }

  getTotalTickets(): number {
    return Object.values(this.quantities).reduce((sum, qty) => sum + qty, 0);
  }

  confirmBooking(): void {
    if (this.getTotalTickets() > 0 && this.selectedDate) {
      this.showConfirmation = true;
      setTimeout(() => {
        this.showConfirmation = false;
      }, 5000);
    }
  }

  resetBooking(): void {
    Object.keys(this.quantities).forEach(key => this.quantities[key] = 0);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.selectedDate = tomorrow.toISOString().split('T')[0];
  }
}

