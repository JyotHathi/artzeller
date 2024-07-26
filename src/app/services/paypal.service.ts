import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {

  //#region GLOBAL_VARIABLES

  private paypalApiUrl = environment.paypalApiUrl;
  private paypalClientId = environment.paypalClientId;
  private paypalSecretKey = environment.paypalSecretKey;
  private paymentCurrency = 'USD';

  //#endregion GLOBAL_VARIABLES
  constructor(private http: HttpClient) {}


   //#region CUSTOM_METHODS
  createOrder(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + accessToken,
    });

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'CAD',
            value: '0.01',
          },
        },
      ],
    };

    return this.http.post<any>(
      `${this.paypalApiUrl}/v2/checkout/orders`,
      orderData,
      { headers }
    );
  }

  captureOrder(orderID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer YOUR_ACCESS_TOKEN`,
    });

    return this.http.post<any>(
      `${this.paypalApiUrl}/v2/checkout/orders/${orderID}/capture`,
      {},
      { headers }
    );
  }

  getAccessToken(): Promise<any> {
    try {
      console.log('getAccessToken method in');
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(
          `${this.paypalClientId}:${this.paypalSecretKey}`
        )}`,
      });

      const body = new HttpParams().set('grant_type', 'client_credentials');

      return new Promise((resolve, reject) => {
        this.http
          .post<any>(this.paypalApiUrl + '/v1/oauth2/token', body, { headers })
          .subscribe({
            next: (response) => {
              resolve(response);
            },
            error: (error) => {
              reject(error);
            },
          });
      });

      // return Promise.resolve(tokenResponse);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof paypal !== 'undefined') {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id='+this.paypalClientId+'&currency=' + this.paymentCurrency;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('PayPal SDK could not be loaded.'));
        document.head.appendChild(script);
      }
    });
  }

  //#endregion CUSTOM_METHODS
}
