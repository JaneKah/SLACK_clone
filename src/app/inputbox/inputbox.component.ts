import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  channelMessages: string = '';

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
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
