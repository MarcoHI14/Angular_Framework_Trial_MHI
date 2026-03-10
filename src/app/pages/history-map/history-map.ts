import { Component, OnInit, HostBinding, inject } from '@angular/core';
import { TimelineComponent } from '../../timeline/timeline';
import { ParkMapComponent } from '../../park-map/park-map';
import { MiniPlayerComponent } from '../../mini-player/mini-player';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-history-map',
  standalone: true,
  imports: [TimelineComponent, ParkMapComponent, MiniPlayerComponent],
  templateUrl: './history-map.html',
  styleUrl: './history-map.css'
})
export class HistoryMapComponent implements OnInit {
  @HostBinding('class.dark-mode') isDarkMode = false;
  private themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }
}



