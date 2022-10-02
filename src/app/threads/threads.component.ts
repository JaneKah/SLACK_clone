import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Channelmessage } from 'src/models/channelmessage.class';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../shared/services/user';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {

  channelId = '';
  public users: User[] = [];
  channel: Channel = new Channel();
  channelMessage: Channelmessage = new Channelmessage();
  public channelMessages: Channelmessage[] = [];
  // db = getFirestore();
  //docRef = doc(collection(this.db, "channels"));
 // date: Date | undefined;
  id : string | null = '';

  constructor(public authService: AuthService, private database: AngularFireDatabase, private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
      
    this.getChannelMessages();
    this.getChatUsersShown();
  });
}

  public getChannelMessages() {
    if (this.channelId) {
    this.firestore
      .collection("channelmessages", ref => ref.orderBy("timestamp", "asc"))
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.channelMessages = changes;
      });
  }
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