import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  constructor(public firestore: AngularFirestore) { }

  public addChannel(channelName: string, dialogRef: MatDialogRef<DialogAddChannelComponent>) {
    this.firestore
      .collection('channels')
      .add({
        'name': channelName
      })
      .then(() => {
        dialogRef.close();
      })
  }
}

