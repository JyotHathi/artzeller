import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NbDatepickerComponent } from '@nebular/theme';
import videojs from 'video.js';
import ColorThief from 'colorthief';
import { AverageColorService } from 'src/app/services/average-color.service';

interface Video {
  videoUrl: string;
  imageUrl: string;
}

@Component({
  selector: 'app-arts-v2',
  templateUrl: './arts-v2.component.html',
  styleUrl: './arts-v2.component.css',
})
export class ArtsV2Component {
  //#region GLOBAL VARIABLES

  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  searchTerm: string = '';
  filteredItems: string[] = [];
  showDropdown: boolean = false;
  selectedChips: string[] = [];

  // videos = new Array(10).fill({
  //   src: 'https://iframe.mediadelivery.net/play/257137/cfdbe93b-23d8-4001-935e-94690ca36bc4',
  //   title: 'Purpose of Life',
  // });
  videos: Video[] = [];
  player: any;

  backgroundColor: string = '#ffffff';
  backgroundImageUrl: string = '';

  @Output() pageTitle = new EventEmitter<string>();
  @Output() pageDescription = new EventEmitter<string>();

  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('formpicker') dateRangePicker:
    | NbDatepickerComponent<Date>
    | undefined;

  //#endregion GLOBAL VARIABLES

  //#region INBUILT METHODS
  constructor(
    private router: Router,
    private averageColorService: AverageColorService
  ) {}

  ngOnInit(): void {
    this.pageTitle.emit(
      'Explore the World of Arts: Inspiring Creativity and Expression'
    );
    this.pageDescription.emit('Create a new video');
    //this.hideDownloadButton();

    // this.player = videojs('bunny-video', {
    //   // Video.js options can be passed here
    // });

    // get-set background of video
    const videoUrl =
      'https://iframe.mediadelivery.net/play/257137/cfdbe93b-23d8-4001-935e-94690ca36bc4';
    this.averageColorService
      .getColorFromVideo(videoUrl)
      .then((color) => {
        this.backgroundColor = color;
        this.applyDiagonalBackground();
      })
      .catch((error) => {
        console.error(error);
      });

    // Populate the array with video and image URLs
    this.videos = [
      {
        videoUrl:
          'https://iframe.mediadelivery.net/embed/257137/cfdbe93b-23d8-4001-935e-94690ca36bc4?autoplay=true&loop=false&muted=false&preload=true&responsive=true',
        imageUrl:
          'https://vz-a9a2725a-03d.b-cdn.net/cfdbe93b-23d8-4001-935e-94690ca36bc4/thumbnail_25d6ca50.jpg',
      },
      // {
      //   videoUrl:
      //     'https://iframe.mediadelivery.net/embed/257137/another-video-url',
      //   imageUrl: 'https://vz-a9a2725a-03d.b-cdn.net/another-image-url.jpg',
      // },
      // Add more videos as needed
    ];
  }

  //#endregion INBUILT METHODS

  //#region  CUSTOM METHODS

  applyDiagonalBackground() {
    const element = document.querySelector('.one') as HTMLElement;
    if (element) {
      element.style.background = `linear-gradient(135deg, ${this.backgroundColor} 0%, transparent 100%)`;
    }
  }

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

  ngAfterViewInit(): void {
    // this.setVideoBackgroundColor();
  }

  setVideoBackgroundColor(): void {
    const videoThumbnailUrl = 'https://path/to/video/thumbnail.jpg'; // Use a thumbnail or a snapshot of the video

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = videoThumbnailUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(img);
      console.log('Dominant Color:', dominantColor); // Debugging: Log the dominant color

      const videoContainer = document.querySelector(
        '.video-list-container'
      ) as HTMLElement;
      videoContainer.style.setProperty(
        '--video-bg-color',
        `rgb(${dominantColor.join(',')})`
      );
    };

    img.onerror = (error) => {
      console.error('Failed to load image:', error);
    };
  }
  //#endregion  CUSTOM METHODS
}
