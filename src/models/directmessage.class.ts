export class Directmessage {
    message: string;
    timestamp: number;
    userId: string;
    channelID?: string; 
    customIdName?: string;
  
  
    constructor(obj?: any) {
      this.message = obj ? obj.message : '';
      this.timestamp = obj ? obj.timestamp : new Date().getTime();
      this.userId = obj ? obj.userId : ''
      this.channelID = obj ? obj.channelID : ''
      this.customIdName = obj ? obj.customIdName : '';
  
    }
  
    public toJSON(): any {
      return {
        message: this.message,
        timestamp: this.timestamp,
        userId: this.userId,
        channelID: this.channelID,
        customIdName: this.customIdName
      }
    }
  }
  