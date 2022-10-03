import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  channel = new Channel();
  channelName: string = '';
  db = getFirestore();
  docRef = doc(collection(this.db, "channels"));
  
  constructor(private database: AngularFireDatabase, public dialogRef: MatDialogRef<DialogAddChannelComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  addChannel() {
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result: any) => {
        this.dialogRef.close();
      });
  }

  onNoClick() {
    this.dialogRef.close()
  }
}
