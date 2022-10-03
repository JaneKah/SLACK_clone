import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/models/channel.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/services/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  panelOpenState = false;
  channel: Channel = new Channel();
  channelId = '';
  public channels: Channel[] = [];
  public users: User[] = [];
  title = "SLACK"
  // db = getFirestore();
 //  docRef = doc(collection(this.db, "channels"));

  constructor(private route: ActivatedRoute,  public authService: AuthService, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getChannels();
   // this.setChannelDoc();
   this.getChatUsersShown();
  }

  public getChannels() {
    this.firestore
      .collection("channels")
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.channels = changes;
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

  setChannelID() {

  }


/*
  setChannelDoc() {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null) {
      this.channelId = id;
      console.log('GOT ID:', this.channelId)
      };
      this.channel.channelID = this.channelId;
  });
  }*/

  openAddChannelDialog(): void {
     this.dialog.open(DialogAddChannelComponent);
  }

  

}
