import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export class Page {
  // The number of elements in the page
  size: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesComponent implements OnInit {
  //#region  GLOBAL VARIABLES

  // state management
  loading = true; // State to control loader visibility
  _title = 'Movies';
  _selectedStatus!: string;
  _selectedType!: string;
  _totalMovies: any;

  // data set
  _movieStatues = ['Any', 'Running', 'Done', 'Error'];
  _movieTypes = ['Any', 'Final Movies', 'Draft Movies'];
  _allRowsData!: any;
  _selectedRows = [];

  // data table
  columns = [
    // { prop: 'id' },
    { name: 'Created', prop: 'Created' },
    { name: 'Status', prop: 'Status' },
    { name: 'Type', prop: 'Type' },
    { name: 'Result', prop: 'Result' },
    { name: 'Duration', prop: 'Duration' },
    { name: 'Size', prop: 'Size' },
  ];
  //#endregion GLOBAL VARIABLES

  //#region COMPONENT METHODS
  constructor() {}

  ngOnInit() {
    /** COMPONENT INITIALIZATION METHOD */

    this.loading = false;
    this.toggleLoadingAnimation();

    //set current status and type
    this.setMovieStatus();
    this.setMovieType();
    this._allRowsData = this._totalMovies = this.getMovies();
    //this._totalMovies = this._allRowsData?.length || 0;
    this.applyFilters(); // Initialize with default filters
  }
  //#endregion COMPONENT METHODS

  //#region FUNCTIONS
  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => (this.loading = false), 2000);
  }

  setMovieStatus() {
    try {
      this._selectedStatus = 'Any';
    } catch (err) {
      console.log('Error on setMovieStatus-->', err);
    }
  }

  setMovieType() {
    try {
      this._selectedType = 'Final Movies';
    } catch (err) {
      console.log('Error on setMovieType-->', err);
    }
  }

  resetFilters() {
    this._selectedStatus = 'Any';
    this._selectedType = 'Any';
    this.applyFilters(); // Reapply filters to reset the table
  }

  resetIndividualFilter(filterName: string) {
    if (filterName === 'status') {
      this._selectedStatus = 'Any';
    } else if (filterName === 'type') {
      this._selectedType = 'Any';
    }
    this.applyFilters(); // Reapply filters after reset
  }

  applyFilters() {
    this.loading = true;
    setTimeout(() => {
      this._selectedRows = this._allRowsData.filter((row: any) => {
        return (
          this._selectedStatus === 'Any' ||
          row['Status'] === this._selectedStatus ||
          this._selectedType === 'Any' ||
          row['Type'] === this._selectedType
        );
      });
      this.loading = false;
    }, 500);
  }

  getMovies() {
    // Fetch or define the initial full dataset
    return [
      {
        id: 1,
        Created: '31-01-2024 01:00 AM',
        Status: 'Any',
        Type: 'Any',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 2,
        Created: '31-01-2024 01:10 AM',
        Status: 'Any',
        Type: 'Full',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 3,
        Created: '31-01-2024 01:10 AM',
        Status: 'Any',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
      {
        id: 4,
        Created: '31-01-2024 01:10 AM',
        Status: 'Error',
        Type: 'Final Movies',
        Result: 'Success',
        Duration: '00:50:00',
        Size: '3400 MB',
      },
    ];
  }
  //#endregion FUNCTIONS
}
