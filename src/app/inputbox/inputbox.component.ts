import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Channelmessage } from 'src/models/channelmessage.class';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';


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
  constructor(public authService: AuthService, private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null ) {
        this.channelId = id;
        console.log('GOT ID:', this.channelId)
      };
      this.channelMessage.channelID = this.channelId;
    });
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('uid');
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
      .then(() => {
        this.channelMessage = new Channelmessage();
      });
    this.resetInputs();
  }


  private resetInputs() {
    let arrayOfInputs = this.inputFields.toArray();
    arrayOfInputs.forEach((input) => (input.nativeElement.value = ''));
  }

}
