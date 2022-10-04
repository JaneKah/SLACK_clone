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
// import { ThreadDrawerComponent } from '../thread-drawer/thread-drawer.component';


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
   db = getFirestore();
   message = this.channelMessage.message;
 
 // date: Date | undefined;
  id : string | null = '';
  isShowing: boolean = false;
  constructor(public authService: AuthService, private database: AngularFireDatabase, private route: ActivatedRoute, private firestore: AngularFirestore) { }
  
  @ViewChild('drawer') drawer!: MatDrawer;


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
      this.channel.customIdName = this.channelId;
    this.getChannelMessages();
    this.getChannelName(); 
    this.getChatUsersShown();
    //this.setChannelID()
   // this.getMessageTime();
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
      .collection("channelmessages", ref => ref.orderBy("timestamp", "asc")
        .where('channelID', '==', this.channelId)
      )  
      .valueChanges( {idField: 'channelID'} )
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

openThread() {
  this.toggleSidenav();
}

toggleSidenav() {
  this.isShowing = !this.isShowing;
}
}

/*
getMessageTime() {
  this.date = new Date(this.channelMessage.timestamp);
}




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
/*
setChannelID() {
 //setDoc(doc(this.db, "channels"), {
 // channelID: this.channelId
//});


this.firestore
.collection('channels')
.doc('channelID')
.update({channelID: this.channelId})
.then(() => {
  console.log('success')
});
}*/
