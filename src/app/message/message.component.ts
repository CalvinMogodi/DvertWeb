import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';

declare var $: any;
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessagesComponent{
    webMessages: Array<any>;
    mobileMessages: Array<any>;
     public messages: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) { 
    this.db.list('/message').subscribe(data =>{
        
        var webMessages = [];
        var mobileMessages = [];
        data.forEach((item) => {
        if(item.isFromWeb){
            webMessages.push(item);
        }else{
            mobileMessages.push(item);
        }
    })
    this.webMessages = webMessages;
    this.mobileMessages = mobileMessages;
      });
  }

    messageRead(message){
        this.db.object('/message/'+ message.$key).update({unread: true});
    }

    deleteMessage(message){
        this.db.object('/message/'+ message.$key).remove();
    }
 
}
