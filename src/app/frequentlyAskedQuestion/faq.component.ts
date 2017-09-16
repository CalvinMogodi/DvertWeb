import { Component, ViewChild, OnInit,ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-frequentlyAskedQuestions',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})


export class FAQsComponent {
  public FAQs: FirebaseListObservable<any>;
  isAdd: boolean = true;
  answerRequired: boolean = false;
  questionRequired: boolean = false;
  faqForm: FormGroup;
  faq:{};
  faqId: '';

   constructor(public db: AngularFireDatabase, public formBuilder: FormBuilder,public toastr: ToastsManager, vcr: ViewContainerRef) { 
     this.toastr.setRootViewContainerRef(vcr);
    this.FAQs = this.db.list('/FAQ');
    this.faqForm = formBuilder.group({
        question: ['', Validators.compose([Validators.required])],
        answer: ['', Validators.compose([Validators.required])],  
    });
  }

  deleteFAQ(faq){
        this.db.object('/FAQ/'+ faq.$key).remove();
        this.toastr.warning('Frequently asked question is updated successfully!', 'Success!');
    }

  editFAQ(faq){
      this.faqId = faq.$key;
      this.isAdd = false;
      this.faqForm.controls['question'].setValue(faq.question);
      this.faqForm.controls['answer'].setValue(faq.answer);
    }

  updateFAQ(){    
    if(this.faqForm.valid){      
       this.faq = {
        question: this.faqForm.get('question').value,
        answer: this.faqForm.get('answer').value,
      }
      this.FAQs.update(this.faqId,this.faq);
         this.isAdd = true;
          this.toastr.success('Frequently asked question is updated successfully!', 'Success!');
         this.resetForm();
    }else{
      this.showError();
    }
        
    }

  addFAQ(){
    if(this.faqForm.valid){
      this.faq = {
        question: this.faqForm.get('question').value,
        answer: this.faqForm.get('answer').value,
      }
      this.FAQs.push(this.faq);
      this.toastr.success('Frequently asked question is added successfully!', 'Success!');
      this.resetForm();
    }else{
      this.showError(); 
    }
        
  }

  resetForm(){
    this.questionRequired = false;
    this.answerRequired = false;
    this.faqForm.reset();
  }
  
  showError(){
    this.questionRequired = false;
     this.answerRequired = false;
    
    if(this.faqForm.get('question').invalid)
      this.questionRequired = true;

    if(this.faqForm.get('answer').invalid)
      this.answerRequired = true;
  }
}