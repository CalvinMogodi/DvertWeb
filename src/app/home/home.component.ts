import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { GlobalValidator} from '../validators/username'
declare var jQuery:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
 
  @ViewChild('loginForm') loginForm;
  title = 'app works!';

  public login = { }

  public forgetPassword = {  }

   public signUp = {
    emailAddress: '',
    newPassword: '',
    confirmPassword: '',
    businessName: '', 
    businessWebsite: '', 
  }
  users: FirebaseListObservable<any[]>;
   //loginForm: FormGroup;
    signUpForm: FormGroup;
    forgotPasswordForm: FormGroup;
    contactUsForm: FormGroup;
    signInAttempt: boolean = false;
    signUpAttempt: boolean = false;
    changePasswordAttempt: boolean = false;
    public message: {}
    contactUsMessage:String = '';
    messageSent:boolean = true;

   constructor(public db: AngularFireDatabase,public router: Router, public formBuilder: FormBuilder){
     this.users = db.list('/user');
      
     this.contactUsForm = formBuilder.group({
        personName: ['', Validators.compose([Validators.required])],
        emailAddress: ['', Validators.compose([Validators.required,Validators.pattern(GlobalValidator.EMAIL_REGEX)])],
        subject: ['', Validators.compose([Validators.required])],
        message: ['', Validators.compose([Validators.required])],  
    });
 // 
     /*  this.loginForm = formBuilder.group({
          emailAddress: ['', Validators.compose([Validators.required])],
          password: ['', Validators.compose([Validators.required])],    
        });

         this.signUpForm = formBuilder.group({
          emailAddress: ['', Validators.compose([Validators.required])],
          newPassword: ['', Validators.compose([Validators.required])], 
          confirmPassword: ['', Validators.compose([Validators.required])],    
        });
         this.forgotPasswordForm = formBuilder.group({
          emailAddress: ['', Validators.compose([Validators.required])],
          newPassword: ['', Validators.compose([Validators.required])],  
          confirmPassword: ['', Validators.compose([Validators.required])],
          businessWebsite: ['', Validators.compose([Validators.required])], 
          businessName: ['', Validators.compose([Validators.required])],
        });*/
    }

    sendMessage(message){
      this.messageSent = false;
      if(this.contactUsForm.valid){
        this.message = {
          personName: this.contactUsForm.get('personName').value,
          emailAddress: this.contactUsForm.get('emailAddress').value,
          subject: this.contactUsForm.get('subject').value,
          message: this.contactUsForm.get('message').value,
          isFromWeb: true,
        };
        this.db.list('/message').push(this.message);
        this.contactUsMessage = 'Your message is sent successfully.'
        this.messageSent = true;
        this.contactUsForm.reset();
       // this.contactUsForm.controls['personName'];   
        //this.contactUsForm.controls['emailAddress'];
       // this.contactUsForm.controls['subject'];
       // this.contactUsForm.controls['message'];      
      }else{
        this.messageSent = true;
        this.contactUsMessage = 'Please fill all required fields.'
      }      
    }
   

  signInClick(user){
    this.signInAttempt = true; 
    if(this.loginForm.valid){
      this.users.forEach(data => {
        data.forEach((item) => {
          jQuery("#myModal2").modal("hide");
          this.router.navigate(['dashboard']);
          if(item.username == user.email && item.password == user.password ){
            //Go 
          }
        })
        
      });
    }
  }

   signUpClick(user){
    this.signUpAttempt = true; 
    if(!this.signUpForm.valid){

    }
  }

   changePasswordClick(user){
    this.changePasswordAttempt = true; 
    if(!this.forgotPasswordForm.valid){

    }
  }
}
