import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  NbCalendarRange,
  NbDateService,
  NbDatepickerComponent,
  NbSidebarService,
} from '@nebular/theme';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/shared/interfaces/video.interface';

@Component({
  selector: 'app-get-videos',
  templateUrl: './get-videos.component.html',
  styleUrl: './get-videos.component.css',
})
export class GetVideosComponent {
  //#region GLOBAL VARIABLES
  _title = 'Videos';
  _pageDescription = 'Review and refine your created videos with ease using our intuitive interface.';
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  selectedDate: Date | null = null;
  _filterSelectedDate: NbCalendarRange<any> = {
    start: null,
    end: null,
  };

  @ViewChild('formpicker') dateRangePicker:
    | NbDatepickerComponent<Date>
    | undefined;

  //#endregion GLOBAL VARIABLES

  //#region INBUILT METHODS
  constructor(
    private videoService: VideoService,
    private dateService: NbDateService<Date>,
    private sidebarService: NbSidebarService
  ) {}

  ngOnInit(): void {
    this.getAllVideos(); // fetch all videos via API
  }

  //#endregion INBUILT METHODS

  //#region  CUSTOM METHODS

  getAllVideos(): void {
    this.videoService
      .getVideos()
      .then((response) => {
        //this.videos = response;
        // sort the response based on the creation time
        this.videos = response.sort((a, b) => {
          return (
            new Date(b.creationTime).getTime() -
            new Date(a.creationTime).getTime()
          );
        });
        this.filteredVideos = [...this.videos]; // Initialize filteredVideos with all videos
        this.filteredVideos = [...this.videos]; // Initialize filteredVideos with all videos
      })
      .catch((error) => {
        console.error('Failed to fetch videos:', error);
      });
  }

  applyFilter(): void {
    // filtered start & end date
    const startDateString = this._filterSelectedDate.start as unknown as string;
    const endDateString = this._filterSelectedDate.end as unknown as string;
    // convert to the date format
    const startDate = startDateString ? new Date(startDateString) : null;
    const endDate = endDateString ? new Date(endDateString) : null;
    // filter videos based on creation date
    if (startDate && endDate) {
      console.log('startdate', startDate, endDate);
      this.filteredVideos = this.videos.filter((video) => {
        const videoDate = new Date(video.creationTime);
        return videoDate >= startDate && videoDate <= endDate;
      });
      let sortedVideos = this.filteredVideos.sort((a, b) => {
        return (
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime()
        );
      });
      this.filteredVideos = [...sortedVideos];
    } else {
      // if either startDate or endDate is not selected, show all videos
      this.filteredVideos = [...this.videos];
    }
  }

  clearFilter(): void {
    // clear filer of date range
    this.selectedDate = null;
    this._filterSelectedDate = {
      start: null,
      end: null,
    };
    this.applyFilter();
  }

  onDateRangeChange(event: any): void {
    console.log('on date range');
    if (event && event?.start && event?.end) {
      let selectedStartDate = event.start;
      let selectedEndDate = event.end;
      selectedStartDate.setHours(0, 0, 0);
      selectedEndDate.setHours(23, 59, 59); // set 23 hours to consider all the videos for that specific day
      this._filterSelectedDate.start = event.start;
      this._filterSelectedDate.end = event.end;
      this.applyFilter(); // apply filter if selected dates are valid
    }
  }

  downloadVideo(videoUrl: string) {
    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = videoUrl;
    anchor.download = 'video.mp4';
    anchor.target = '_blank';

    // trigger the download
    anchor.click();
  }

  openFullScreen() {
    const videoElement = document.getElementById(
      'videoElement'
    ) as HTMLVideoElement;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    }
  }

  refreshVideos() {
    // get all latest videos from API & reset filter
    this.clearFilter();
    this.getAllVideos();
  }
  //#endregion  CUSTOM METHODS
}
