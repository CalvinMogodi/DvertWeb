import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'message', title: 'Message',  icon:'notifications', class: '' },
    { path: 'companies', title: 'Companies',  icon:'person', class: '' },
    { path: 'advert', title: 'Advert',  icon:'library_books', class: '' },
    { path: 'faq', title: 'FAQs',  icon:'bubble_chart', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      /*if ($(window).width() > 991) {
          return false;
      }*/
      return true;
  };
}
