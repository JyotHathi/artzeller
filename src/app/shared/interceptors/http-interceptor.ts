import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
  constructor(private toastr: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          // if error code is 401 then redirect to the login page
          // if (error.status == 401) {
          //   window.location.href = '/login';
          // }
          // Display a toastr message based on the error status code
          this.displayToastrMessage(error.status);
        }
        // Return an empty observable to prevent further propagation of the error
        throw error;
      })
    );
  }

  private displayToastrMessage(statusCode: number): void {
    let message: string;
    let title: string;
    switch (statusCode) {
      case 400:
        message =
          'There is an error while proceesing your request. Kindly Retry after sometime.';
        title = 'Bad Request';
        break;
      case 401:
        message = "You're not authorized to perform this action.";
        title = 'Unauthorized';
        break;
      case 403:
        message = "You're not authorized to perform this action.";
        title = 'Forbidden';
        break;
      case 404:
        message =
          'There is an error while proceesing your request. Kindly Retry after sometime.';
        title = 'Not Found';
        break;
      // Add more cases as needed
      default:
        message =
          'There is an error while proceesing your request. Kindly Retry after sometime.';
        title = 'Server Error';
        break;
    }
    this.toastr.showError(title, message);
  }
}
