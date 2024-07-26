import { Component, Inject, OnInit } from '@angular/core';
import {
  NB_WINDOW,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
} from '@nebular/theme';
import { filter } from 'rxjs';
import { OauthService } from '../auth/services/oauth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';
import { AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //#region  GLOBAL VARIABLES
  _title = 'Dashboard';
  _isAdminRole = false;
  pageTitle: string = '';
  pageDescription: string = '';

  profileItems = [{ title: 'Account' }, { title: 'Log out' }];

  items: NbMenuItem[] = [
    {
      title: 'Plan & Qouta',
      icon: 'pricetags-outline',
      link: '/dashboard/plan-qoute',
    },
    {
      title: 'Create a Video',
      icon: 'plus-square-outline',
      link: '/dashboard/videos/create',
    },
    // {
    //   title: 'Videos',
    //   icon: 'film-outline',
    //   link: '/dashboard/movies',
    // },
    {
      title: 'Videos',
      icon: 'film-outline',
      link: '/dashboard/videos/get',
    },
    {
      title: 'Connections',
      icon: 'options-2-outline',
      link: '/dashboard/connections',
    },
    {
      title: 'Account',
      icon: 'settings-2-outline',
      link: '/dashboard/account',
    },
  ];

  //#endregion  GLOBAL VARIABLES

  //#region  INBUILT METHODS
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private oauthService: OauthService,
    private router: Router,
    private cryptoService: CryptoService,  private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitleAndDescription();
    });
  }


  ngOnInit() {

    this.validateAdminRole(); // validate if the logged In user is admin or not

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Log out') {
        this.logout();
      }
    });
  }

  //#endregion  INBUILT METHODS

  //#region CUSTOM METHODS
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  logout(): void {}

  // validate if the loggedIn user is admin or not
  validateAdminRole(): void {
    try {
      this.oauthService
        .isAdmin()
        ?.then((isAdmin) => {
          this._isAdminRole = isAdmin ? true : false;
          console.log("in dashboard component admin is valid ->>", this._isAdminRole, isAdmin)
        })
        .catch((err) => {
          console.warn('Failed to check admin role', err);
        });
    } catch (err) {
      console.warn('Error while validating the admin role', err);
    }
  }

  setPageTitle(title: string) {
    this.pageTitle = title;
  }

  setPageDescription(description: string) {
    this.pageDescription = description;
  }


  updateTitleAndDescription() {
    let currentRoute = this.activatedRoute.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    currentRoute.data.subscribe(data => {
      this.pageTitle = data['title'] || '';
      this.pageDescription = data['description'] || '';
    });
  }

  onActivate(componentRef: any) {
    if (componentRef.pageTitle) {
      componentRef.pageTitle.subscribe((title: string) => {
        this.pageTitle = title;
      });
    }
    if (componentRef.pageDescription) {
      componentRef.pageDescription.subscribe((description: string) => {
        this.pageDescription = description;
      });
    }
  }

  //#endregion
}
