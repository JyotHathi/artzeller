import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { RazorpayService } from 'src/app/services/razor-pay.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  //#region GLOBAL VARIABLES
  checkoutForm: FormGroup;
  paypalClientId = environment.paypalClientId;
  paypalSecretKey = environment.paypalSecretKey;
  customerEmail: string = '';
  emailError: boolean = false;
  paypalButtonInstance: any;
  purchasedVideoDetails = {
    src: 'https://iframe.mediadelivery.net/embed/257137/cfdbe93b-23d8-4001-935e-94690ca36bc4?autoplay=false&loop=false&muted=false&preload=false&responsive=true4',
    title: 'Purpose of Life',
  };
  razorpayButtonDisabled: boolean = true;

  //#endregion GLOBAL VARIABLES

  //#region COMPONENT METHODS
  constructor(
    private fb: FormBuilder,
    private paypalService: PaypalService,
    private router: Router,
    private razorpayService: RazorpayService,
    private notificationService: NotificationService
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.paypalService
      .loadPayPalScript()
      .then(() => {
        this.renderPayPalButton();
      })
      .catch((err: any) => {
        console.error('PayPal SDK could not be loaded.', err);
      });
  }
  //#endregion COMPONENT METHODS

  //#region   CUSTOM_METHODS

  processPayment() {
    try {
      if (this.checkoutForm.valid) {
        this.paypalService.getAccessToken().then(
          (response) => {
            const accessToken = response.access_token;
            console.log('accesstoken from paypal', accessToken);
            this.paypalService.createOrder(accessToken).subscribe(
              (order) => {
                const approvalUrl = order.links.find(
                  (link: { rel: string }) => link.rel === 'approve'
                ).href;
                window.location.href = approvalUrl;
              },
              (error) => {
                console.error('Error creating order:', error);
              }
            );
          },
          (error: any) => {
            console.error('Error getting access token:', error);
          }
        );
      }
    } catch (err) {
      console.log('error while processing your payment.');
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  onEmailChange(): void {
    if (this.validateEmail(this.customerEmail)) {
      this.emailError = false;
      if (this.paypalButtonInstance) {
        this.paypalButtonInstance.enable();
      }
      this.razorpayButtonDisabled = false;
    } else {
      this.emailError = true;
      if (this.paypalButtonInstance) {
        this.paypalButtonInstance.disable();
      }
      this.razorpayButtonDisabled = true;
    }
  }

  renderPayPalButton(): void {
    paypal
      .Buttons({
        createOrder: (
          data: any,
          actions: {
            order: {
              create: (arg0: {
                purchase_units: {
                  amount: { value: string };
                  custom_id: string;
                  description: string;
                }[];
              }) => any;
            };
          }
        ) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '10.00',
                },
                custom_id: this.customerEmail, //video id #TEMPORARY BASIS - TO BE CHANGE LATER
                description:JSON.stringify({
                  customerEmail: this.customerEmail
                })
                  
              },
            ],
          });
        },
        onInit: (
          data: any,
          actions: { disable: () => void; enable: () => void }
        ) => {
          this.paypalButtonInstance = actions;
          actions.disable(); // Disable the button initially
        },
        onApprove: (
          data: any,
          actions: { order: { capture: () => Promise<any> } }
        ) => {
          return actions.order.capture().then((details: any) => {
            console.log('details from paypal', details);
            //alert('Transaction completed by ' + details.payer.name.given_name);
            // Redirect or handle the success
            let paypalOrderId = details?.id;
            this.router.navigate(['/payment/success'], {
              queryParams: { id: paypalOrderId },
            });
            //window.location.href = `/payment/success?id=` + paypalOrderId ;
          });
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          this.router.navigate(['/payment/failure'], {
            queryParams: { id: 'failure' },
          });
          //window.location.href = `/payment/failure?id=failure`;
        },
      })
      .render('#paypal-buttons-container');
  }

  initiatePaymentWithRazorPay(): void {
    console.log("On click of razor pay")
    if (this.validateEmail(this.customerEmail)) {
      this.emailError = false;
      if (this.paypalButtonInstance) {
        this.paypalButtonInstance.enable();
      }
      this.razorpayButtonDisabled = false;
    } else {
      this.emailError = true;
      if (this.paypalButtonInstance) {
        this.paypalButtonInstance.disable();
      }
      this.razorpayButtonDisabled = true;
      this.notificationService.showWarning(
        'Warning',
        'Please enter a valid shippinh email.'
      );
    }
    try {
      const amount = 100; // Replace with your actual amount
      let productInfo = 'https://iframe.mediadelivery.net/embed/257137/cfdbe93b-23d8-4001-935e-94690ca36bc4';
      this.razorpayService
        .createOrder(amount, this.customerEmail, productInfo)
        .then((response) => {
          console.log('Payment successful:', response);
          let razorPaymentOrderId = response?.razorpay_payment_id;
          this.router.navigate(['/payment/success'], {
            queryParams: { id: razorPaymentOrderId },
          });
        })
        .catch((error) => {
          console.error('Payment failed:', error);
          this.router.navigate(['/payment/failure'], {
            queryParams: { id: 'failure' },
          });
        });
    } catch (err) {
      console.error('Error occurred while processing a payment:', err);
    }
  }
  //#endregion CUSTOM_METHODS
}
