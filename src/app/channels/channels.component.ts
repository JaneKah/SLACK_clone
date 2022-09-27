import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Channelmessage } from 'src/models/channelmessage.class';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent implements OnInit {
  public channels: Channel[] = [];
  public channelMessages: Channelmessage[]  = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getChannelMessages();
  }

  public getChannelMessages() {
    this.firestore
      .collection("channelmessages")
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.channelMessages = changes;
      });
  }
}
