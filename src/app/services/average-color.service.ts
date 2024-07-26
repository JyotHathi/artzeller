import { Injectable } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';

@Injectable({
  providedIn: 'root'
})
export class AverageColorService {
  private fac: FastAverageColor;

  constructor() {
    this.fac = new FastAverageColor();
  }

  getColorFromVideo(videoUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoUrl;
      video.load();

      video.addEventListener('loadeddata', () => {
        video.currentTime = video.duration / 2;
      });

      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');

        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          this.fac.getColorAsync(canvas)
            .then(color => resolve(color.hex))
            .catch(err => reject(err));
        } else {
          reject('Failed to get canvas context');
        }
      });

      video.addEventListener('error', (err) => {
        reject('Error loading video: ' + err);
      });
    });
  }
}
