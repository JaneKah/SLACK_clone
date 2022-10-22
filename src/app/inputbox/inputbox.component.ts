import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Channelmessage } from 'src/models/channelmessage.class';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.scss']
})
export class InputboxComponent implements OnInit {

  @ViewChildren('input') inputFields!: QueryList<any>;

  channelMessage = new Channelmessage();
  channel: Channel = new Channel();
  public users: User[] = [];
  /*
  user: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
};
 */
  channelId = '';
  //  channelId!: string;
  // public uid: string | null = '';
  userFromInterface = {} as User;
  userid = this.authService.userData.uid;
  db = getFirestore();
  docRef = doc(collection(this.db, "channels"));

  constructor(public authService: AuthService, private database: AngularFireDatabase, private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null ) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
      this.channelMessage.channelID = this.channelId;
    });
    this.channelMessage.userId = this.userid;
    console.log('current User Id is:', this.userid)
  }

  send() {
    this.firestore
      .collection('channelmessages')
      .add(this.channelMessage.toJSON())
      .then((docRef) => {
        console.log('Message ID:', docRef.id) 
        this.channelMessage = new Channelmessage();
      });
      this.channel.channelID = this.channelId;
     
    this.resetInputs();
  }

  

  private resetInputs() {
    let arrayOfInputs = this.inputFields.toArray();
    arrayOfInputs.forEach((input) => (input.nativeElement.value = ''));
  }
/*
  async setMessageId(messageId: string) {
    const loadMessage = doc(
      this.firebase,
      `channelmessages/${messageId}`
    );
    await updateDoc(loadMessage, { message: messageId });
  }*/

}
