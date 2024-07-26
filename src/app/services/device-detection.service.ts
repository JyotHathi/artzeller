// device-detection.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectionService {

  constructor() { }

  isMobileDevice(): boolean {
    return window.innerWidth <= 768; // You can adjust the width according to your requirements
  }

  isDesktopDevice(): boolean {
    return window.innerWidth > 768;
  }
}
