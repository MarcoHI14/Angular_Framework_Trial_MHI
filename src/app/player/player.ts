import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService, Track } from '../services/audio.service';

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  private audioService = inject(AudioService);

  isPlaying$ = this.audioService.isPlaying$;
  currentTrackIndex$ = this.audioService.currentTrackIndex$;
  currentTime$ = this.audioService.currentTime$;
  duration$ = this.audioService.duration$;
  volume$ = this.audioService.volume$;
  isMuted$ = this.audioService.isMuted$;

  showPlaylist = false;
  playlist: Track[] = [];

  ngOnInit(): void {
    this.playlist = this.audioService.getPlaylist();
  }

  get currentTrack(): Track {
    return this.audioService.getCurrentTrack();
  }

  play(): void {
    this.audioService.play();
  }

  pause(): void {
    this.audioService.pause();
  }

  togglePlay(): void {
    this.audioService.togglePlayPause();
  }

  next(): void {
    this.audioService.nextTrack();
  }

  previous(): void {
    this.audioService.previousTrack();
  }

  seek(time: number): void {
    this.audioService.seek(time);
  }

  changeVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioService.setVolume(Number(input.value));
  }

  toggleMute(): void {
    this.audioService.toggleMute();
  }

  togglePlaylist(): void {
    this.showPlaylist = !this.showPlaylist;
  }

  playTrack(index: number): void {
    this.audioService.loadTrack(index);
    this.audioService.play();
  }

  formatTime(time: number): string {
    if (!time || isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  getProgress(currentTime: number, duration: number): number {
    return duration ? (currentTime / duration) * 100 : 0;
  }
}
