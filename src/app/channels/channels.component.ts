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
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent implements OnInit {
  channelId = '';
  public users: User[] = [];
  channel: Channel = new Channel();
  channelMessage: Channelmessage = new Channelmessage();
  public channelMessages: Channelmessage[] = [];
  // db = getFirestore();
  //docRef = doc(collection(this.db, "channels"));
  date: Date | undefined;
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
    this.getChannelName(); 
    this.getMessageTime();
  });
}

  public getChannelName() {
    if (this.channelId) {
    this.firestore
      .collection("channels")
      .doc(this.channelId)
      .valueChanges({idField: 'customIdName'} )
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      });
    }
  }

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

getMessageTime() {
  this.date = new Date(this.channelMessage.timestamp);
}
}


/*
ngOnInit(): void {
  this.route.paramMap.subscribe(paramMap => {
    let id = paramMap.get('id');
    if (id !== null) {
    this.channelID = id;
    console.log('GOT ID:', this.channelID)

  });
  this.getChannelMessages(); 

}
}*/