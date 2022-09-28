import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Channelmessage } from 'src/models/channelmessage.class';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent implements OnInit {
  channelId = '';
  channel: Channel = new Channel();
  channelMessage: Channelmessage = new Channelmessage();
  public channelMessages: Channelmessage[] = [];
  db = getFirestore();
  docRef = doc(collection(this.db, "channels"));

  constructor(private database: AngularFireDatabase, private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null) {
      this.channelId = id;
      console.log('GOT ID:', this.channelId)
      };
    this.getChannelName(); 
    this.getChannelMessages();
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
      .collection("channelmessages")
      .valueChanges( {idField: 'channelID'} )
      .subscribe((changes: any) => {
        this.channelMessages = changes;
      });
  }
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