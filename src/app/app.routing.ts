import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './message/message.component';
import { FAQsComponent } from './frequentlyAskedQuestion/faq.component';
import { HomeComponent } from './home/home.component';
import { AdvertComponent } from './advert/advert.component';
import { CompaniesComponent } from './companies/companies.component';
import { PrivacyPoliciesAndTermsConditionsComponent } from './privacyPoliciesAndTermsConditions/privacyPoliciesAndTermsConditions.component';

const routes: Routes =[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'message', component: MessagesComponent },
    { path: 'faq', component: FAQsComponent },
    { path: 'home', component: HomeComponent },
    { path: 'advert', component: AdvertComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'privacyPoliciesAndTermsConditions', component: PrivacyPoliciesAndTermsConditionsComponent },
       
    /*  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' }*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
