import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { GlobalValidator} from '../validators/username'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jQuery:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
    businessEmailInvaild: boolean = false;
    businessEmailRequired: boolean = false;
    businessNameRequired: boolean = false;
    businessWebsiteRequired: boolean = false;
    businessPasswordRequired: boolean = false;
    passwordRequirements: boolean = false;
    confirmPasswordRequired: boolean = false;
    passwordsDoNotMatch: boolean = false;

    personNameRequired: boolean = false;
    cuemailAddressInvaild: boolean = false;
    cuemailAddressRequired: boolean = false;
    subjectRequired: boolean = false;
    messageRequired: boolean = false;
    
    loginEmailRequired: boolean = false;
    loginPasswordRequired: boolean = false;
    invaildLogin: boolean = false;
  
  users: FirebaseListObservable<any[]>;
    loginForm: FormGroup;
    signUpForm: FormGroup;
    forgotPasswordForm: FormGroup;
    contactUsForm: FormGroup;
    signInAttempt: boolean = false;
    signUpAttempt: boolean = false;
    changePasswordAttempt: boolean = false;
    public message: {}
    contactUsMessage:String = '';

   constructor(public db: AngularFireDatabase,public router: Router, public formBuilder: FormBuilder,public toastr: ToastsManager, vcr: ViewContainerRef){
     this.toastr.setRootViewContainerRef(vcr);
     this.users = this.db.list('/user');
     this.contactUsForm = formBuilder.group({
        personName: ['', Validators.compose([Validators.required])],
        emailAddress: ['', Validators.compose([Validators.required,Validators.pattern(GlobalValidator.EMAIL_REGEX)])],
        subject: ['', Validators.compose([Validators.required])],
        message: ['', Validators.compose([Validators.required])],  
    });
 
      this.loginForm = formBuilder.group({
          loginEmail: ['', Validators.compose([Validators.required])],
          loginPassword: ['', Validators.compose([Validators.required])],    
        });

         this.signUpForm = formBuilder.group({
          businessEmail: ['', Validators.compose([Validators.required,Validators.pattern(GlobalValidator.EMAIL_REGEX)])],
          businessName: ['', Validators.compose([Validators.required])],
          businessWebsite: ['', Validators.compose([Validators.required])],
          businessPassword: ['', Validators.compose([Validators.required])], 
          confirmPassword: ['', Validators.compose([Validators.required])],    
        });
        /*  this.forgotPasswordForm = formBuilder.group({
          emailAddress: ['', Validators.compose([Validators.required])],
          newPassword: ['', Validators.compose([Validators.required])],  
          confirmPassword: ['', Validators.compose([Validators.required])],
          businessWebsite: ['', Validators.compose([Validators.required])], 
          businessName: ['', Validators.compose([Validators.required])],
        });*/
    }

    sendMessage(message){
      if(this.contactUsForm.valid){
        this.message = {
          personName: this.contactUsForm.get('personName').value,
          emailAddress: this.contactUsForm.get('emailAddress').value,
          subject: this.contactUsForm.get('subject').value,
          message: this.contactUsForm.get('message').value,
          isFromWeb: true,
        };
        this.db.list('/message').push(this.message);
        this.toastr.success('Message has been sent successfully!', 'Success!');  
        this.contactUsResetForm();     
      }else{
        this.contactUsFormShoeErrors()
      }      
    }

    contactUsResetForm(){
      this.personNameRequired = false;
      this.cuemailAddressInvaild = false;
      this.cuemailAddressRequired = false;
      this.subjectRequired = false;
      this.messageRequired = false;
      this.contactUsForm.reset();  
    }

    contactUsFormShoeErrors(){
      this.personNameRequired = false;
      this.cuemailAddressInvaild = false;
      this.cuemailAddressRequired = false;
      this.subjectRequired = false;
      this.messageRequired = false;

      if(this.contactUsForm.controls['personName'].invalid)
        this.personNameRequired = true;

       if(this.contactUsForm.controls['emailAddress'].invalid){
          if(this.contactUsForm.controls['emailAddress'].errors['required'])
            this.cuemailAddressRequired = true;     

          if(this.contactUsForm.controls['emailAddress'].errors['pattern'])
            this.cuemailAddressInvaild = true;
        }

        if(this.contactUsForm.controls['subject'].invalid)
          this.subjectRequired = true;

        if(this.contactUsForm.controls['message'].invalid)
          this.messageRequired = true;
    }

    
   
// Login methods
  signInClick(){
    if(this.loginForm.valid){
      this.invaildLogin = false;
       var email = this.loginForm.get('loginEmail').value;
       var password = this.loginForm.get('loginPassword').value;

       this.db.list('/user',{query: {orderByChild: 'username', equalTo: email }}).subscribe(data =>{
          if(data.length > 0){
              for(var u = 0; u <= data.length; u++){
                var thisUser = data[u];
                if(thisUser.username == email && thisUser.password == password ){
                    jQuery("#myModal2").modal("hide");                   
                    this.resetLoginForm();  
                    localStorage.setItem('currentUser', JSON.stringify({ isAuthenticated: true, isBusiness: thisUser.isBusiness }));
                     this.router.navigate(['dashboard']);
                    break;          
                }
              }
          }else{
            this.invaildLogin = true;
          }
       });     
    }
    else{
      this.showLoginErrors();
    }
  }
  resetLoginForm(){
    this.loginEmailRequired = false;
    this.loginPasswordRequired = false;
    this.invaildLogin = false;
    this.loginForm.reset();
  }

  showLoginErrors(){
    this.loginEmailRequired = false;
    this.loginPasswordRequired = false;
    this.invaildLogin = false;

    if(this.loginForm.controls['loginEmail'].invalid)
        this.loginEmailRequired = true;
    if(this.loginForm.controls['loginPassword'].invalid)
        this.loginPasswordRequired = true;
  }

//Sign up methods
   signUpClick(){
    this.signUpAttempt = true; 
    if(this.validateSignUpForm()){
      var user = {
        createdDate: new Date().toString(),
        businessEmail: this.signUpForm.controls['businessEmail'].value.toString().trim(),
        businessName: this.signUpForm.controls['businessName'].value.toString().trim(),
        businessWebsite: this.signUpForm.controls['businessWebsite'].value.toString().trim(),
        businessPassword: this.signUpForm.get('businessPassword').value,
        isBusiness: true
      };
      this.db.list('/user').push(user);
      this.resetSignUpForm();
      jQuery("#myModal3").modal("hide");
      this.toastr.success('User is saved successfully, You can now login.', 'Success!');
    }
  }

  resetSignUpForm(){
    this.businessEmailInvaild = false;
    this.businessEmailRequired = false;
    this.businessNameRequired = false;
    this.businessWebsiteRequired = false;
    this.businessPasswordRequired = false;
    this.passwordRequirements = false;
    this.confirmPasswordRequired = false;
    this.passwordsDoNotMatch = false;
    this.signUpForm.reset();
  }

  validateSignUpForm(){
    var isValid = true;
    this.businessEmailInvaild = false;
    this.businessEmailRequired = false;
    this.businessNameRequired = false;
    this.businessWebsiteRequired = false;
    this.businessPasswordRequired = false;
    this.passwordRequirements = false;
    this.confirmPasswordRequired = false;
    this.passwordsDoNotMatch = false;

    if(this.signUpForm.controls['businessEmail'].invalid)
    {
      if(this.signUpForm.controls['businessEmail'].errors['required']){
        this.businessEmailRequired = true;
        isValid = false;
      }

      if(this.signUpForm.controls['businessEmail'].errors['pattern']){
        this.businessEmailInvaild = true;
        isValid = false;
      }
    }
    
    if(this.signUpForm.controls['businessName'].invalid)
    {
      this.businessNameRequired = true;
      isValid = false;
    }

    if(this.signUpForm.controls['businessWebsite'].invalid)
    {
      this.businessWebsiteRequired = true;
      isValid = false;
    }
    //password checks
    if(this.signUpForm.controls['businessPassword'].invalid)
    {
      this.businessPasswordRequired = true;
      isValid = false;
    }

    if(this.signUpForm.controls['confirmPassword'].invalid)
    {
      this.confirmPasswordRequired = true;
      isValid = false;
    }
    var password = this.signUpForm.get('businessPassword').value;
    var confirmPassword = this.signUpForm.get('confirmPassword').value;

    if(password != confirmPassword){
      this.passwordsDoNotMatch = true;
      isValid = false;
    }

    if(password.length < 7){
      this.passwordRequirements = true;
      isValid = false;
    }

    var hasSpeChrat = /^[a-zA-Z0-9- ]*$/.test(password);
    if(hasSpeChrat) {
      this.passwordRequirements = true;
      isValid = false;
    }

    var containsNumber = /\d/.test(password);
    if(!containsNumber) {
      this.passwordRequirements = true;
      isValid = false;
    }

    var hasLowerCase = password.toUpperCase() != password;
    if(!hasLowerCase){
      this.passwordRequirements = true;
      isValid = false;
    }

    var hasUpperCase = password.toLowerCase() != password;
    if(!hasUpperCase){
      this.passwordRequirements = true;
      isValid = false;
    };

    

    return isValid;
  }

   changePasswordClick(user){
    this.changePasswordAttempt = true; 
    if(!this.forgotPasswordForm.valid){

    }
  }
}
