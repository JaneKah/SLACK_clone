import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Channelmessage } from 'src/models/channelmessage.class';

import { User } from '../shared/services/user';
import { Users } from 'src/models/users.class';
import { Directmessage } from 'src/models/directmessage.class';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent implements OnInit {
  channelId : string | null = '';
  channelMessage: Channelmessage = new Channelmessage();
  public channelMessages: Channelmessage[] = [];
  directMessage: Directmessage = new Directmessage();
  public directMessages: Directmessage[] = [];
  public users: User[] = [];
  //declare user: User;
  //userFromClass: Users = new Users();
  //userFromInterface = {} as User;

  constructor(public authService: AuthService, private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('uid');
      if (id !== null) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
    this.getChannelMessages();
  // this.getChannelName()
  this.getChatUsersShown() 
  });
  }


  public getChannelMessages() {
    if (this.channelId) {
    this.firestore
      .collection("directmessages", ref => ref.orderBy("timestamp", "asc")
        .where('channelID', '==', this.channelId)
      )
      .valueChanges( {idField: 'channelID'} )
      .subscribe((changes: any) => {
        this.directMessages = changes;
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


/*
  public getChannelMessages() {
    if (this.channelId) {
    this.firestore
      .collection("channelmessages", ref => ref
        .where('channelID', '==', this.channelId)
      )
      .valueChanges( {idField: 'channelID'} )
      .subscribe((changes: any) => {
        this.channelMessages = changes;
      });
  }
}



public getChannelName() {
  if (this.channelId) {
  this.firestore
    .collection("users")
    .doc(this.channelId)
    .valueChanges({idField: 'customIdName'} )
    .subscribe((user: any) => {
      this.user = new Users(user);
    });
  }
}*/

}
