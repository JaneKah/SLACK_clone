import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Directmessage } from 'src/models/directmessage.class';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';


@Component({
  selector: 'app-inputbox-direct-msg',
  templateUrl: './inputbox-direct-msg.component.html',
  styleUrls: ['./inputbox-direct-msg.component.scss']
})
export class InputboxDirectMsgComponent implements OnInit {

  @ViewChildren('input') inputFields!: QueryList<any>;

  directMessage = new Directmessage();
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
  constructor(public authService: AuthService, private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
      this.directMessage.channelID = this.channelId;
    });
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('uid');
      if (id !== null) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
      this.directMessage.channelID = this.channelId;
    });
    this.directMessage.userId = this.userid;
    console.log('current User Id is:', this.userid)
  }

  send() {
      if (this.directMessage.message !== '') {
        this.firestore
          .collection('directmessages')
          .add(this.directMessage.toJSON())
          .then(() => {
            this.directMessage = new Directmessage();
          });
      }
    this.resetInputs();
  }


  private resetInputs() {
    let arrayOfInputs = this.inputFields.toArray();
    arrayOfInputs.forEach((input) => (input.nativeElement.value = ''));
  }

}

