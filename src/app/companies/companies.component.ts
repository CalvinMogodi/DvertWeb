import { Component, ViewChild, OnInit, ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalValidator} from '../validators/username'

declare var jQuery:any;
@Component({
    selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})


export class CompaniesComponent {  
  businessEmailRequired: boolean = false;
  businessNameRequired: boolean = false;
  businessWebsiteRequired: boolean = false;
  businessForm: FormGroup;
  businessId: '';
  business: {};
  public businesses: Array<any>;

  constructor(public db: AngularFireDatabase, public formBuilder: FormBuilder,public toastr: ToastsManager, vcr: ViewContainerRef) { 
     this.toastr.setRootViewContainerRef(vcr);
    this.db.list('/user').subscribe(data => {
      var businesses = [];
      data.forEach(item => {
        if(item.isBusiness){
          businesses.push(item);
        }
      });
      this.businesses  = businesses;
    });
    this.businessForm = formBuilder.group({
         businessName: ['', Validators.compose([Validators.required])],
        businessEmail : ['', Validators.compose([Validators.required,Validators.pattern(GlobalValidator.EMAIL_REGEX)])],  
        businessWebsite: ['', Validators.compose([Validators.required,Validators.pattern(GlobalValidator.URL_REGEX)])], 
    });
  }

   editBusiness(business){
      this.businessId = business.$key;
      this.businessForm.controls['businessName'].setValue(business.businessName);
      this.businessForm.controls['businessEmail'].setValue(business.username);
      this.businessForm.controls['businessWebsite'].setValue(business.businessWebsite);
    }

  updateBusiness(){    
    if(this.businessForm.valid){      
       this.business = {
        businessName: this.businessForm.get('businessName').value,
        username: this.businessForm.get('businessEmail').value,
        businessWebsite: this.businessForm.get('businessWebsite').value,
      }
      this.db.list('/user').update(this.businessId,this.business);
        jQuery("#myEditModal").modal("hide");
          this.toastr.success('Business is updated successfully!', 'Success!');
         this.resetForm();
    }else{
      this.showError();
    }
        
  }
  
   resetForm(){
      this.businessEmailRequired = false;
      this.businessNameRequired = false;
      this.businessWebsiteRequired = false;
      this.businessForm.reset();
    }
  
  showError(){
    this.businessEmailRequired = false;
      this.businessNameRequired = false;
      this.businessWebsiteRequired = false;
    
    if(this.businessForm.get('businessEmail').invalid)
      this.businessEmailRequired = true;

    if(this.businessForm.get('businessName').invalid)
      this.businessNameRequired = true;

    if(this.businessForm.get('businessWebsite').invalid)
      this.businessWebsiteRequired = true;
  }

}