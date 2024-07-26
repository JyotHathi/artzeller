import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrl: './failure.component.css',
})
export class FailureComponent {
   //#region GLOBAL VARIABLES
   orderId = null;
   //#endregion GLOBAL VARIABLES
 
   //#region COMPONENT METHODS
   constructor(private route: ActivatedRoute, private router: Router) {}
 
   ngOnInit(): void {
     // Extract the id from query parameters
     this.route.queryParams.subscribe((params) => {
       const id = params['id'];
       this.orderId = id;
       console.log('id from query param', id);
       if (id) {
         // If id is present, remove it from the URL
         this.removeIdFromUrl();
       } else {
         // If id is not present, redirect to home
         this.router.navigate(['/home']);
       }
     });
   }
 
   //#endregion COMPONENT METHODS
 
   //#region CUSTOM METHODS
   private removeIdFromUrl(): void {
     // Log before removing the id to ensure this method is called correctly
     console.log('Removing id from URL');
     // Use the history API to replace the URL without reloading the page
     const urlWithoutQueryParams = this.router.url.split('?')[0];
     window.history.replaceState({}, '', urlWithoutQueryParams);
   }
 
   backtoHome() {
     this.router.navigate(['/home']);
   }
 
   //#endregion CUSTOM METHODS
}
