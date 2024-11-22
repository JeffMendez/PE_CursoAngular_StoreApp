import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';

import WaveSurfer from 'wavesurfer.js'

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl: string = '';
  @ViewChild('waveForm') containerWave!: ElementRef;

  private waveAudio!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit() {
    this.waveAudio = WaveSurfer.create({
      url: this.audioUrl,
      container: this.containerWave.nativeElement,
      waveColor: '#4F4A85',
      progressColor: '#383351',
    });

    this.waveAudio.on('play', () => this.isPlaying.set(true));
    this.waveAudio.on('pause', () => this.isPlaying.set(false));
  }

  ngOnDestroy() {

  }

  playPause() {
    this.waveAudio.playPause();
  }
}
