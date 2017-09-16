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
   users: FirebaseListObservable<any[]>;
    signInAttempt: boolean = false;
  constructor(public location: Location, public db: AngularFireDatabase, router : Router) {
    router.events.subscribe((url:any) => {     
        if(url.url == '/home' || url.url == '/'){
          this.isAuthenticated = false ;
        }
        else{
           this.isAuthenticated = true ;
        }
    });
  }

  ngOnInit() {
  }

}
