import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialog } from '@angular/material';
import { ApproveRejectComponent } from './approveReject/approveReject.component';

declare var jQuery:any;
declare var $: any;
@Component({
    selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})


export class AdvertComponent {
    awaitApprovelADs: Array<any>;
    adverts: Array<any>;
    public selectAdvert: {};
    advertId: string = '';
     private toggleButton: any;
    private sidebarVisible: boolean;
   
  public advertsToUpdata: FirebaseListObservable<any>;

    constructor(public db: AngularFireDatabase, public dialog: MdDialog){
        this.advertsToUpdata = db.list('/advert'); 
     db.list('/advert').subscribe(data => {
         var adverts = [];
         var awaitApprovelADs = [];
         this.adverts = [];
        data.forEach((item) => {
            if(item.isApproved == false){
                item.dateStart = new Date(item.dateStart);
                item.dateEnd = new Date(item.dateEnd);
                awaitApprovelADs.push(item);
            }
            if(new Date(item.dateEnd) < new Date()){
                item.status = 'Expired';               
            }else  if(!item.isApproved){
                item.status = 'Awaiting Approval';
            }else  if(item.isApproved){
                 item.status = 'Approved';
            }else{
                item.status = 'Rejected';
            }
            adverts.push(item);
            
        });
        this.adverts = adverts;
        this.awaitApprovelADs = awaitApprovelADs;
     });
    
    }

    approveRejectAdvert(selectAdvert, index){
        this.awaitApprovelADs;
        this.advertId = selectAdvert.$key;
        var startDate = (selectAdvert.dateStart).toDateString()
         var endDate = (selectAdvert.dateEnd).toDateString()
        jQuery("#approveRejectAdModal").modal("show");
       this.selectAdvert = selectAdvert;
       if(selectAdvert.postAsaBusiness){
            jQuery("#businessNameDiv").show();
            jQuery("#businessWebsiteDiv").show();
             jQuery("#selectAdvertBusinessName").val(selectAdvert.businessName);
       jQuery("#selectAdvertBusinessWebsite").val(selectAdvert.businessWebsite);
       }else{
            jQuery("#businessNameDiv").hide();
            jQuery("#businessWebsiteDiv").hide();
       }
       jQuery("#selectAdvertDdvertName").val(selectAdvert.advertName);
       jQuery("#selectAdvertCustomerDisplayName").val(selectAdvert.userDisplayName);
       jQuery("#selectAdvertCategory").val(selectAdvert.category);
       jQuery("#selectAdvertLocation").val(selectAdvert.location);
       jQuery("#selectAdvertDataStart").val(startDate);
       jQuery("#selectAdvertDateEnd").val(endDate);
       jQuery("#selectAdvertTimeStart").val(selectAdvert.timeStart);
       jQuery("#selectAdvertTimeEnd").val(selectAdvert.timeEnd);
       jQuery("#selectAdvertMobileNumber").val(selectAdvert.mobileNumber);
       jQuery("#selectAdvertEmailAddress").val(selectAdvert.emailAddress);
        jQuery("#selectAdvertDiscription").val(selectAdvert.discription);
        jQuery("#selectAdvertimage").attr("src",selectAdvert.imageRef);
        jQuery("#selectAdvertimageFull").attr("src",selectAdvert.imageRef);
       
    } 
    imageOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    imageClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.imageOpen();
        } else {
            this.imageClose();
        }
    };
    toggleAdvertModel(){
        jQuery('#mainModel').hide();
        jQuery('#imageModel').show();
    }

    toggleAdvertModel1(){
        jQuery('#imageModel').hide();
        jQuery('#mainModel').show();
    }
        
    approveAdvert(selectAdvert){
        if(this.advertId){             
           this.advertsToUpdata.update(this.advertId, {isApproved: true});
           // this.showNotification("Advert has been approved successfully.", 'success')
         
            this.advertId = undefined;
            this.selectAdvert = undefined;
            jQuery("#approveRejectAdModal").modal("hide");
           
        }
    }

    showNotification(message, color){
      //const type = ['','info','success','warning','danger'];


      $.notify({
          message: message

      },{
          type: color,
          timer: 4000,
          placement: {
              from: 'top',
              align: 'right'
          }
      });
  }

    rejectAdvert(selectAdvert){
        if(this.advertId){
            this.advertsToUpdata.update(this.advertId, {isRejected: true, isApproved: null});
           // this.showNotification("Advert has been rejected successfully.", 'success')
            this.selectAdvert = undefined;
            this.advertId = undefined;
            jQuery("#approveRejectAdModal").modal("hide");
             
        }
    }
}