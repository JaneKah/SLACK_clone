export class Channel {
    channelName: string;
    channelID? : string;
    customIdName?: string;
   channelMessage: string;

  
    constructor (obj? : any) {
      this.channelName = obj ? obj.channelName : '';
      this.channelID = obj ? obj.channelID : '';
      this.customIdName = obj ? obj.customIdName : '';
      this.channelMessage = obj ? obj.channelMessage : '';
    }
  
    public toJSON() : any {
      return {
        channelName: this.channelName,
        channelID : this.channelID,
        customIdName : this.customIdName,
        channelMessage : this.channelMessage
      }
    }
  }
  