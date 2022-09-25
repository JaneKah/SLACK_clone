export class Channel {
    name: string;
    channelID? : string;
  
    constructor (obj? : any) {
      this.name = obj ? obj.name : '';
      this.channelID = obj ? obj.channelID : '';
    }
  
    public toJSON() : any {
      return {
        name: this.name,
        channelID : this.channelID
      }
    }
  }
  