import { Component } from '@angular/core';
import { PlannerComponent } from '../../planner/planner';
import { BookingComponent } from '../../booking/booking';
import { MiniPlayerComponent } from '../../mini-player/mini-player';

@Component({
  selector: 'app-planning-booking',
  standalone: true,
  imports: [PlannerComponent, BookingComponent, MiniPlayerComponent],
  templateUrl: './planning-booking.html',
  styleUrl: './planning-booking.css'
})
export class PlanningBookingComponent {}

