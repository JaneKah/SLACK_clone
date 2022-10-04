import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Channelmessage } from 'src/models/channelmessage.class';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../shared/services/user';
import { AuthService } from '../shared/services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-thread-drawer',
  templateUrl: './thread-drawer.component.html',
  styleUrls: ['./thread-drawer.component.scss']
})
export class ThreadDrawerComponent implements OnInit {

  channelId = '';
  public users: User[] = [];
  channel: Channel = new Channel();
  channelMessage: Channelmessage = new Channelmessage();
  public channelMessages: Channelmessage[] = [];
   db = getFirestore();
   message = this.channelMessage.message;
 
 // date: Date | undefined;
  id : string | null = '';
  userid = this.authService.userData.uid;
  constructor(public authService: AuthService, private database: AngularFireDatabase, private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('currentuser');
      if (id !== null) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
    this.getChannelMessages();
    this.getChannelName(); 
    this.getChatUsersShown();
    //this.setChannelID()
   // this.getMessageTime();
  });
}

  public getChannelName() {
    this.firestore
      .collection("channels")
      .doc(this.channelId)
      .valueChanges({idField: 'customIdName'} )
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      });
  }
  

  public getChannelMessages() {
    this.firestore
      .collection("channelmessages", ref => ref.orderBy("timestamp", "asc"))  
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.channelMessages = changes;
      });
}

public getChatUsersShown() {
  this.firestore
  .collection("users")
  .valueChanges( {idField: 'customIdName'} )
  .subscribe((changes: any) => {
    this.users = changes;
  });
}


}
