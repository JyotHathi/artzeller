// razorpay.service.ts
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  //#region GLOBAL VARIABLES
  private _razorpayAPIKey = environment.razorpayAPIKey;
  private _razorpayKeySecret = environment.razorpayKeySecret;
  private _razorpayAppName = environment.razorpayAppName;

  //#endregion GLOBAL VARIABLES
  constructor() {}

  //#region METHODS

  createOrder(
    amount: number,
    shippingEmail: string,
    productInfo: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        key: this._razorpayAPIKey, // Razorpay API key
        amount: amount * 100, // amount in paise
        currency: 'INR', // currency code
        name: this._razorpayAppName,
        description: 'Mithya Product Description', // description - send email here
        image: '', // optional: company logo URL
        handler: (response: any) => {
          resolve(response);
        },
        // prefill: {
        //   name: 'Mithya',
        //   email: 'testuser@example.com',
        //   contact: '+919876543210',
        // },
        theme: {
          color: '#430099', // theme color
        },
        notes: {
          customerEmail: shippingEmail,
          productLink: productInfo,
        }, // Pass metadata or additional notes here - send product link/name here
      };
      const rzp = new Razorpay(options);
      rzp.open();
    });
  }
}
