import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-player.html',
  styleUrls: ['./mini-player.css']
})
export class MiniPlayerComponent implements OnInit {
  private audioService = inject(AudioService);

  isPlaying$ = this.audioService.isPlaying$;
  currentTrack$ = this.audioService.currentTrackIndex$;
  currentTime$ = this.audioService.currentTime$;
  duration$ = this.audioService.duration$;
  volume$ = this.audioService.volume$;

  ngOnInit(): void {
    // Inicializar el servicio de audio
  }

  togglePlay(): void {
    this.audioService.togglePlayPause();
  }

  nextTrack(): void {
    this.audioService.nextTrack();
  }

  previousTrack(): void {
    this.audioService.previousTrack();
  }

  seek(time: number): void {
    this.audioService.seek(time);
  }

  setVolume(volume: number): void {
    this.audioService.setVolume(volume);
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getProgress(currentTime: number, duration: number): number {
    return duration ? (currentTime / duration) * 100 : 0;
  }
}

