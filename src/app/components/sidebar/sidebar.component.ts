import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Subscription } from 'rxjs';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user', title: 'Users',  icon:'person', class: '' },
    { path: '/plans', title: 'Plans',  icon:'work', class: '' },
    { path: '/subscriptions', title: 'Subscriptions',  icon:'content_paste', class: '' },
    { path: '/products', title: 'Products',  icon:'shopping_basket', class: '' },
    { path: '/commands', title: 'Commands',  icon:'shopping_cart', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  private userSub : Subscription
  isAuthenticated = false;
  isAdmin=false;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userSub= this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      if(this.isAuthenticated){
        this.isAdmin = user.role==="ADMIN"? true : false;
        }
  })
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
