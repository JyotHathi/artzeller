import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaypalService } from 'src/app/services/paypal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  paypalClientId = environment.paypalClientId;
  paypalSecretKey = environment.paypalSecretKey;

  constructor(
    private fb: FormBuilder,
    private paypalService: PaypalService,
    private router: Router
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

  //#region   CUSTOM_METHODS

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      // this.paypalService.getAccessToken().subscribe(
      //   (response) => {
      //     const accessToken = response.access_token;
      //     this.paypalService.createOrder(accessToken).subscribe(
      //       (order) => {
      //         const approvalUrl = order.links.find((link: { rel: string; }) => link.rel === 'approve').href;
      //         window.location.href = approvalUrl;
      //       },
      //       (error) => {
      //         console.error('Error creating order:', error);
      //       }
      //     );
      //   },
      //   (error) => {
      //     console.error('Error getting access token:', error);
      //   }
      // );
    }
  }

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

  renderPayPalButton(): void {
    paypal
      .Buttons({
        createOrder: (
          data: any,
          actions: {
            order: {
              create: (arg0: {
                purchase_units: {
                  amount: {
                    value: string; // Replace with your actual amount
                  };
                }[];
              }) => any;
            };
          }
        ) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '100.00', // Replace with your actual amount
                },
              },
            ],
          });
        },
        onApprove: (
          data: any,
          actions: { order: { capture: () => Promise<any> } }
        ) => {
          return actions.order.capture().then((details) => {
            console.log("details from paypal", details);
            alert('Transaction completed by ' + details.payer.name.given_name);
           // this.router.navigate(['/dashboard/payment/success']);
          });
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          this.router.navigate(['/dashboard/payment/failure']);
        },
      })
      .render('#paypal-buttons-container');
  }

  //#endregion CUSTOM_METHODS
}
