import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Video } from '../shared/interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
// use to manage the video related APIs
export class VideoService {
  //#region GLOBAL VARIABLES
  private _baseUrl = environment.baseUrl;
  private _createVideo = environment.createVideo;
  private _getVideos = environment.getVideos;
  _variation = null;
  _debug = null;
  constructor(private http: HttpClient) {}

  //#endregion GLOBAL VARIABLES

  //#region GET

  //#endregion

  //#region POST
  createVideo(script: string, variation: any, debug: any): Promise<any> {
    try {
      let apiUrl = this._baseUrl + this._createVideo;
      const token = localStorage.getItem('access_token');
      if (!token) {
        return Promise.reject('Unauthorized operation');
      }
      const requestBody = {
        variation: variation || this._variation,
        script: script,
        debug: debug || this._debug,
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*', // Add the Access-Control-Allow-Origin header here
      });

      return new Promise((resolve, reject) => {
        this.http.post<any>(apiUrl, requestBody, { headers }).subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  getVideos(): Promise<Video[]> {
    let apiUrl = this._baseUrl + this._getVideos;
    let resVideos: Video;
    const token = localStorage.getItem('access_token');
    if (!token) {
      return Promise.reject('Unauthorized operation');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*', // Add the Access-Control-Allow-Origin header here
    });

    return new Promise((resolve, reject) => {
      this.http.get<{ videos: Video[] }>(apiUrl, { headers }).subscribe({
        next: (response) => {
          resolve(response.videos); // Resolve with the videos array directly
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  //#endregion
}
