import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

@Component({
    selector: 'app-approveReject',
  templateUrl: './approveReject.component.html',
  styleUrls: ['./approveReject.component.css']
})


export class ApproveRejectComponent {
    awaitApprovelADs: Array<any>;;
    adverts: Array<any>;;

    constructor(public db: AngularFireDatabase, public dialogRef: MdDialogRef<ApproveRejectComponent>){
    }
}