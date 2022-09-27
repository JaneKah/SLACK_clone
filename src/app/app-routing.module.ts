import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { ThreadsComponent } from './threads/threads.component';

const routes: Routes = [
  {path: '', component: ThreadsComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'channels/:id', component: ChannelsComponent},
  {path: 'direct-messages', component: DirectMessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
