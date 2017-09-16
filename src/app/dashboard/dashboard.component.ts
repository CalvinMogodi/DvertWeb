import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
    selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
    awaitingApprovalAdverts: Array<any>;
    rejectedAdverts: Array<any>;
    freeAdvertCount : number = 0;
    approvedAdverts: Array<any>;

    constructor(public db: AngularFireDatabase){
      this.awaitingApprovalAdverts = [];
      this.rejectedAdverts = [];
       this.db.object('/trialSetting/123456789').subscribe(data =>{
        this.freeAdvertCount = data.totalCount;
      });

      this.db.list('/advert', {query: {orderByChild: 'isApproved', equalTo: false } }).subscribe(data =>{
        this.awaitingApprovalAdverts = data;
      });
     this.db.list('/advert', {query: {orderByChild: 'isRejected', equalTo: true } }).subscribe(data =>{
       this.rejectedAdverts = data;
     });
     this.db.list('/advert', {query: {orderByChild: 'isApproved', equalTo: true } }).subscribe(data =>{
       this.approvedAdverts = data;
     });
    }

}