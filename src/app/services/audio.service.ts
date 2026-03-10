import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Track {
  title: string;
  artist: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioElement: HTMLAudioElement;
  private playlist: Track[] = [
    { title: 'Bienvenido a Tivoli', artist: 'Tivoli World', url: 'assets/music/tivolimusic.mp3' },
    { title: 'Había una vez un circo', artist: 'Los Payasos de la Tele', url: 'assets/music/circo.m4a' },
    { title: 'Dale Ramón', artist: 'Los Payasos de la Tele', url: 'assets/music/daleRamon.m4a' },
    { title: 'La Gallina Turuleca', artist: 'Los Payasos de la Tele', url: 'assets/music/gallina.m4a' },
    { title: 'Hola Don Pepito', artist: 'Los Payasos de la Tele', url: 'assets/music/pepito.m4a' },
    { title: 'Los días de la semana', artist: 'Los Payasos de la Tele', url: 'assets/music/semana.mp3' }
  ];

  private currentTrackIndexSubject = new BehaviorSubject<number>(0);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private durationSubject = new BehaviorSubject<number>(0);
  private volumeSubject = new BehaviorSubject<number>(1);
  private isMutedSubject = new BehaviorSubject<boolean>(false);
  private isInitialized = false;

  currentTrackIndex$ = this.currentTrackIndexSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();
  currentTime$ = this.currentTimeSubject.asObservable();
  duration$ = this.durationSubject.asObservable();
  volume$ = this.volumeSubject.asObservable();
  isMuted$ = this.isMutedSubject.asObservable();

  constructor() {
    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    this.setupAudioListeners();
    // Inicializar la canción solo una vez
    if (!this.isInitialized) {
      this.loadTrack(0);
      this.play();
      this.isInitialized = true;
    }
  }

  private setupAudioListeners(): void {
    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTimeSubject.next(this.audioElement.currentTime);
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      this.durationSubject.next(this.audioElement.duration || 0);
    });

    this.audioElement.addEventListener('ended', () => {
      this.nextTrack();
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlayingSubject.next(true);
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlayingSubject.next(false);
    });
  }

  loadTrack(index: number): void {
    if (index >= 0 && index < this.playlist.length) {
      this.currentTrackIndexSubject.next(index);
      this.audioElement.src = this.playlist[index].url;
      this.audioElement.load();
    }
  }

  play(): void {
    this.audioElement.play().catch(e => console.log('Autoplay blocked:', e));
  }

  pause(): void {
    this.audioElement.pause();
  }

  togglePlayPause(): void {
    if (this.isPlayingSubject.value) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextTrack(): void {
    let nextIndex = this.currentTrackIndexSubject.value + 1;
    if (nextIndex >= this.playlist.length) {
      nextIndex = 0;
    }
    this.loadTrack(nextIndex);
    this.play();
  }

  previousTrack(): void {
    let prevIndex = this.currentTrackIndexSubject.value - 1;
    if (prevIndex < 0) {
      prevIndex = this.playlist.length - 1;
    }
    this.loadTrack(prevIndex);
    this.play();
  }

  seek(time: number): void {
    this.audioElement.currentTime = time;
  }

  setVolume(volume: number): void {
    volume = Math.max(0, Math.min(1, volume));
    this.volumeSubject.next(volume);
    this.audioElement.volume = volume;
  }

  toggleMute(): void {
    const muted = !this.isMutedSubject.value;
    this.isMutedSubject.next(muted);
    this.audioElement.muted = muted;
  }

  getPlaylist(): Track[] {
    return this.playlist;
  }

  getCurrentTrack(): Track {
    return this.playlist[this.currentTrackIndexSubject.value];
  }

  getIsPlaying(): boolean {
    return this.isPlayingSubject.value;
  }
}

