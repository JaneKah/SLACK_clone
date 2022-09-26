import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/models/channel.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from './services/sidebar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  panelOpenState = false;
  public channels: Channel[] = [];
  title = "SLACK"

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, public sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getChannels();
  }

  public getChannels() {
    this.firestore
      .collection("channels")
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.channels = changes;
      });
  }

  openAddChannelDialog(): void {
     this.dialog.open(DialogAddChannelComponent);
  }

  

}
