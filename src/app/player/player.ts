import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Track {
  title: string;
  artist: string;
  url: string;
}

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrls: ['./player.css']
})
export class PlayerComponent implements AfterViewInit, OnDestroy {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  playlist: Track[] = [
    { title: 'Bienvenido a Tivoli', artist: 'Tivoli World', url: 'assets/music/tivolimusic.mp3' },
    { title: 'Había una vez un circo', artist: 'Los Payasos de la Tele', url: 'assets/music/circo.m4a' },
    { title: 'Dale Ramón', artist: 'Los Payasos de la Tele', url: 'assets/music/daleRamon.m4a' },
    { title: 'La Gallina Turuleca', artist: 'Los Payasos de la Tele', url: 'assets/music/gallina.m4a' },
    { title: 'Hola Don Pepito', artist: 'Los Payasos de la Tele', url: 'assets/music/pepito.m4a' },
    { title: 'Los días de la semana', artist: 'Los Payasos de la Tele', url: 'assets/music/semana.mp3' }
  ];

  currentTrackIndex = 0;
  isPlaying = false;

  currentTime = 0;
  duration = 0;
  volume = 1;
  isSeeking = false;
  isMuted = false;
  showPlaylist = false;
  private removeAutoplayUnlockListeners?: () => void;
  private shouldRetryAutoplayWhenReady = false;
  private autoplayRetryCount = 0;
  private readonly maxAutoplayRetries = 3;

  ngAfterViewInit(): void {
    const audio = this.audioPlayer.nativeElement;

    audio.addEventListener('timeupdate', () => {
      if (!this.isSeeking) {
        this.currentTime = audio.currentTime;
        this.duration = audio.duration || 0;
        // Forzar detección de cambios para actualizar la UI en tiempo real
        this.cdr.detectChanges();
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      this.duration = audio.duration || 0;
      this.currentTime = 0;
      this.cdr.detectChanges();
    });

    // Asegurar que cuando se carga un nuevo audio, se reinicia el tiempo
    audio.addEventListener('loadstart', () => {
      this.currentTime = 0;
      this.duration = 0;
      this.cdr.detectChanges();
    });

    // Si el primer play falla por carga aún no lista, reintenta al estar listo.
    audio.addEventListener('canplay', () => {
      if (this.shouldRetryAutoplayWhenReady && !this.isPlaying) {
        this.tryAutoplay();
      }
    });

    // Fuerza carga temprana y lanza autoplay al entrar.
    audio.preload = 'auto';
    audio.load();
    this.tryAutoplay();
  }

  ngOnDestroy(): void {
    this.removeAutoplayUnlockListeners?.();
    this.removeAutoplayUnlockListeners = undefined;
  }

  get currentTrack(): Track {
    return this.playlist[this.currentTrackIndex];
  }

  get progress(): number {
    return this.duration ? (this.currentTime / this.duration) * 100 : 0;
  }

  play() {
    this.audioPlayer.nativeElement.play().then(() => {
      this.isPlaying = true;
      this.cdr.detectChanges();
    }).catch(error => {
      console.error('Error al reproducir:', error);
      this.isPlaying = false;
      this.handleAutoplayFailure(error);
      this.cdr.detectChanges();
    });
  }

  pause() {
    this.audioPlayer.nativeElement.pause();
    this.isPlaying = false;
  }

  togglePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  next() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.resetAndPlay();
  }

  previous() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.resetAndPlay();
  }

  resetAndPlay() {
    const audio = this.audioPlayer.nativeElement;

    // Reiniciar los valores de tiempo para que la barra vuelva al inicio
    this.currentTime = 0;
    this.duration = 0;

    audio.load();

    // Esperar a que el audio esté listo antes de reproducir
    audio.addEventListener('canplay', () => {
      if (this.isPlaying) {
        audio.play().catch(error => {
          console.error('Error al reproducir:', error);
          this.isPlaying = false;
        });
      }
    }, { once: true });

    this.isPlaying = true;
  }

  seek(event: Event) {
    const input = event.target as HTMLInputElement;
    const time = Number(input.value);
    this.currentTime = time;
    this.audioPlayer.nativeElement.currentTime = time;
    this.cdr.detectChanges();
  }

  onSeekStart() {
    this.isSeeking = true;
  }

  onSeekEnd() {
    this.isSeeking = false;
  }

  changeVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = Number(input.value);
    this.audioPlayer.nativeElement.volume = this.volume;

    // Si el volumen es mayor que 0, desmutear automáticamente
    if (this.volume > 0 && this.isMuted) {
      this.isMuted = false;
      this.audioPlayer.nativeElement.muted = false;
    }

    this.cdr.detectChanges();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioPlayer.nativeElement.muted = this.isMuted;
    this.cdr.detectChanges();
  }

  togglePlaylist() {
    this.showPlaylist = !this.showPlaylist;
  }

  playTrack(index: number) {
    this.currentTrackIndex = index;
    this.resetAndPlay();
  }

  formatTime(time: number): string {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  private tryAutoplay() {
    const audio = this.audioPlayer.nativeElement;
    this.shouldRetryAutoplayWhenReady = false;
    audio.muted = false;
    audio.volume = this.volume;
    this.isMuted = false;

    audio.play().then(() => {
      this.isPlaying = true;
      this.autoplayRetryCount = 0;
      this.cdr.detectChanges();
    }).catch((error: unknown) => {
      this.isPlaying = false;
      this.handleAutoplayFailure(error);
      this.cdr.detectChanges();
    });
  }

  private handleAutoplayFailure(error: unknown) {
    const domError = error as DOMException | undefined;

    if (domError?.name === 'NotAllowedError') {
      // Bloqueo real por política de autoplay: espera primer gesto del usuario.
      this.setupAutoplayUnlockOnFirstInteraction();
      return;
    }

    // Fallo temporal por carga inicial lenta (muy común al primer ng serve).
    if (this.autoplayRetryCount < this.maxAutoplayRetries) {
      this.autoplayRetryCount += 1;
      this.shouldRetryAutoplayWhenReady = true;
      return;
    }

    // Si tras varios intentos sigue fallando, cae al desbloqueo por gesto.
    this.setupAutoplayUnlockOnFirstInteraction();
  }

  private setupAutoplayUnlockOnFirstInteraction() {
    if (this.removeAutoplayUnlockListeners) {
      return;
    }

    const tryPlay = () => {
      this.removeAutoplayUnlockListeners?.();
      this.removeAutoplayUnlockListeners = undefined;
      this.play();
    };

    const options: AddEventListenerOptions = { once: true, passive: true };

    window.addEventListener('click', tryPlay, options);
    window.addEventListener('touchstart', tryPlay, options);
    window.addEventListener('keydown', tryPlay, options);

    this.removeAutoplayUnlockListeners = () => {
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };
  }
}
