import { Injectable } from '@angular/core';
import { Channelmessage } from 'src/models/channelmessage.class';


@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  isThreadOpened: boolean = false;
  threadForMessageId: string = ''; // says, tho which message id belongs the thread
  // parentMessage: Channelmessage;
  isShowing: boolean = false;


  constructor() { }


  openThread() {
    this.toggleSidenav();
  }
  
  toggleSidenav() {
    this.isThreadOpened = !this.isThreadOpened;
  }

  public closeThread() {
    this.isThreadOpened = false;
 
  }
  
}
