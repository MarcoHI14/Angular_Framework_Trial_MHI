import { Component } from '@angular/core';
import { TimelineComponent } from '../../timeline/timeline';
import { ParkMapComponent } from '../../park-map/park-map';

@Component({
  selector: 'app-map-history',
  standalone: true,
  imports: [TimelineComponent, ParkMapComponent],
  templateUrl: './map-history.html',
  styleUrl: './map-history.css'
})
export class MapHistoryComponent {}

