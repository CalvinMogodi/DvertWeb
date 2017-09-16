import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideRoutes} from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
//import { MdDialog } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './message/message.component';
import { FAQsComponent } from './frequentlyAskedQuestion/faq.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPoliciesAndTermsConditionsComponent } from './privacyPoliciesAndTermsConditions/privacyPoliciesAndTermsConditions.component';
import { AdvertComponent } from './advert/advert.component';
import { CompaniesComponent } from './companies/companies.component';
import { MdDialogModule } from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

export const firebaseConfig = {
   apiKey: "AIzaSyBHQX44svGWHFMdmLa2kmD_lhVAm6YC-4I",
    authDomain: "vert-adc31.firebaseapp.com",
    databaseURL: "https://vert-adc31.firebaseio.com",
    projectId: "vert-adc31",
    storageBucket: "vert-adc31.appspot.com",
    messagingSenderId: "55466391699"
};
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    FAQsComponent,
    HomeComponent,
    CompaniesComponent,
    AdvertComponent,
   PrivacyPoliciesAndTermsConditionsComponent
  ],
   exports: [RouterModule],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ComponentsModule,
    AppRoutingModule,
    RouterModule,
    MdDialogModule,
   BrowserAnimationsModule,
   ToastModule.forRoot()
   // MdDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
