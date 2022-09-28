import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Channelmessage } from 'src/models/channelmessage.class';


@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.scss']
})
export class InputboxComponent implements OnInit {

  
  @ViewChildren('input') inputFields!: QueryList<any>;

  channelMessage = new Channelmessage();
  channel: Channel = new Channel();
  channelId!: string;


  constructor( private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id !== null) {
      this.channelId = id;
      console.log('GOT ID:', this.channelId)
      };
      this.channelMessage.channelID = this.channelId;
  });
  }

  send() {
    this.firestore
      .collection('channelmessages')
      .add(this.channelMessage.toJSON())
      .then(() => {
        this.channelMessage = new Channelmessage();
      });
      this.setDocChannelID();
      this.resetInputs();
  }

  setDocChannelID() {
   
  }

  private resetInputs() {
    let arrayOfInputs = this.inputFields.toArray();
    arrayOfInputs.forEach((input) => (input.nativeElement.value = ''));
  }

}
