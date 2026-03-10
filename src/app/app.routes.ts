import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { HistoryMapComponent } from './pages/history-map/history-map';
import { PlanningBookingComponent } from './pages/planning-booking/planning-booking';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'historia-mapa', component: HistoryMapComponent },
  { path: 'planificacion-reserva', component: PlanningBookingComponent }
];
