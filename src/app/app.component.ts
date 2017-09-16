import { Component, OnInit, ViewChild } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy, } from '@angular/common';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   @ViewChild('loginForm') loginForm;
  isAuthenticated: boolean = false ; 
  goToPrivacyPoliciesAndTermsConditions: boolean = false ; 
   users: FirebaseListObservable<any[]>;
    signInAttempt: boolean = false;
  constructor(public location: Location, public db: AngularFireDatabase,public router : Router) {
    router.events.subscribe((url:any) => { 
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if(url.url == '/home' || url.url == '/' ){
          this.isAuthenticated = false ;
          this.goToPrivacyPoliciesAndTermsConditions = false ;
        }else if(url.url == '/privacyPoliciesAndTermsConditions'){
          this.goToPrivacyPoliciesAndTermsConditions = true;
        }
        else{
          if(currentUser != null){
            if(currentUser.isAuthenticated){
              this.isAuthenticated = true ;
              this.goToPrivacyPoliciesAndTermsConditions = false ;
            }else{
               this.isAuthenticated = false ;
            this.router.navigate(['home']); 
            }            
          }  else{
            this.isAuthenticated = false ;
            this.router.navigate(['home']);            
          }
          
        }
    });
  }

  ngOnInit() {
  }

}
