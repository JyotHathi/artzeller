import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  //#region GLOBAL VARIABLES
  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();
  constructor() {}

  //#endregion GLOBAL VARIABLES

  //#region CUSTOM METHODS

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }
  //#endregion CUSTOM METHODS
}
