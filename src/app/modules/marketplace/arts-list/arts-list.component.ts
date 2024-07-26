import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  NbDatepickerComponent,
} from '@nebular/theme';
import { Observable, startWith } from 'rxjs';
import { DeviceDetectionService } from 'src/app/services/device-detection.service';
import videojs from 'video.js';
declare var BunnyPlayer: any;
@Component({
  selector: 'app-arts-list',
  templateUrl: './arts-list.component.html',
  styleUrl: './arts-list.component.css',
})
export class ArtsListComponent {
  //#region GLOBAL VARIABLES

  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  searchTerm: string = '';
  filteredItems: string[] = [];
  showDropdown: boolean = false;
  selectedChips: string[] = [];

  videos = new Array(5).fill({
    src: 'https://iframe.mediadelivery.net/play/257137/cfdbe93b-23d8-4001-935e-94690ca36bc4',
    title: 'Purpose of Life',
  });
  player: any;
  isMobile = false;


  @Output() pageTitle = new EventEmitter<string>();
  @Output() pageDescription = new EventEmitter<string>();

  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('formpicker') dateRangePicker:
    | NbDatepickerComponent<Date>
    | undefined;

  //#endregion GLOBAL VARIABLES

  //#region INBUILT METHODS
  constructor(private router: Router, private deviceService: DeviceDetectionService) {}

  ngOnInit(): void {
    this.pageTitle.emit(
      'Explore the World of Arts: Inspiring Creativity and Expression'
    );
    this.pageDescription.emit('Create a new video');
    //this.hideDownloadButton();

    // this.player = videojs('bunny-video', {
    //   // Video.js options can be passed here
    // });

    this.isMobile = this.deviceService.isMobileDevice();
    console.log("isMobile" , this.deviceService.isMobileDevice());
  }

  //#endregion INBUILT METHODS

  //#region  CUSTOM METHODS

  hideDownloadButton(): void {
    const video = this.videoPlayer.nativeElement;

    // Attempt to hide download button using CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Hide download button in WebKit-based browsers */
      video::-webkit-media-controls-enclosure {
        overflow: hidden;
      }
      video::-webkit-media-controls-panel {
        overflow: hidden;
      }
      video::-webkit-media-controls-download-button {
        display: none;
      }
      /* Hide download button in Firefox */
      video::-moz-download-button {
        display: none;
      }
    `;
    document.head.appendChild(style);

    // Additional check to hide download button in the shadow DOM
    const hideDownloadButtonInShadowDom = () => {
      const shadowRoot =
        video.shadowRoot || video.attachShadow({ mode: 'open' });
      const buttons = shadowRoot.querySelectorAll('button');
      buttons.forEach((button) => {
        if (button.title === 'Download') {
          button.style.display = 'none';
        }
      });
    };

    video.addEventListener('loadeddata', hideDownloadButtonInShadowDom);

    // Repeat check after a delay to ensure consistency
    setTimeout(hideDownloadButtonInShadowDom, 1000);
  }

  downloadVideo(): void {
    const video = this.videoPlayer.nativeElement;
    const source = video.querySelector('source');
    const url = source?.src || video.currentSrc;

    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'video.mp4'; // Provide a default name for the downloaded video file
      a.click();
    }
  }

  purchaseVideo() {
    try {
      this.router.navigate(['/checkout']);
    } catch (err) {
      console.log('error occurred while purchasing the video');
    }
  }

  filterItems() {
    this.filteredItems = this.items.filter((item) =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.showDropdown = true;
  }

  selectItem(item: string) {
    this.searchTerm = '';
    if (!this.selectedChips.includes(item)) {
      this.selectedChips.push(item);
    }
    this.showDropdown = false;
  }

  removeChip(chip: string) {
    const index = this.selectedChips.indexOf(chip);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  onFocus() {
    this.showDropdown = true;
  }

  //#endregion  CUSTOM METHODS
}
