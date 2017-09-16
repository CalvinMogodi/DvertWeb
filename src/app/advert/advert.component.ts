import { Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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

    constructor(public db: AngularFireDatabase, public dialog: MdDialog,public toastr: ToastsManager, vcr: ViewContainerRef){
        this.advertsToUpdata = db.list('/advert'); 
        this.toastr.setRootViewContainerRef(vcr);
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

    approveRejectAdvert(selectAdvert, isView){
        this.awaitApprovelADs;
        this.advertId = selectAdvert.$key;
        var startDate = new Date(selectAdvert.dateStart).toDateString()
         var endDate = new Date(selectAdvert.dateEnd).toDateString()
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
       if(new Date(selectAdvert.dateEnd) < new Date() || selectAdvert.isRejected)
            jQuery("#deleteBtn").show();
       else
            jQuery("#deleteBtn").hide();
        
        if(isView){
            jQuery("#rejectBtn").hide();
            jQuery("#approveBtn").hide();
        }else{
            jQuery("#rejectBtn").show();
            jQuery("#approveBtn").show();
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
            this.advertId = undefined;
            this.selectAdvert = undefined;
            jQuery("#approveRejectAdModal").modal("hide");
           this.toastr.success('Advert is approved successfully!', 'Success!');
        }
    }

    rejectAdvert(selectAdvert){
        if(this.advertId){
            this.advertsToUpdata.update(this.advertId, {isRejected: true, isApproved: null});
            this.selectAdvert = undefined;
            this.advertId = undefined;
            jQuery("#approveRejectAdModal").modal("hide");
            this.toastr.warning('Advert is rejected successfully!', 'Success!');
        }
    }

    deleteAdvert(){
        if(this.advertId){
            this.db.list('/advert/'+ this.advertId).remove();
            this.selectAdvert = undefined;
            this.advertId = undefined;
            jQuery("#approveRejectAdModal").modal("hide");
            this.toastr.warning('Advert is deleted successfully!', 'Success!');
        }
    }
}