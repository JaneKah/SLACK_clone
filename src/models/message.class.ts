export class Message {
    text: string;
    timestamp: number;
    userId: string; // is the firebase document ID from the user who sent the message, for example user 3C651LYhk1HaB8Y0Vsbf
    channelId: string; // is the firebase document ID from the channel, in which message was posted, for example channel 8liMczKcm1Paer7sJbAX
    textStyle: "normal" | "bold" |  "italic" | "linethrough" | "code" = 'normal';
    imageUrl?: string;
  
    constructor(obj?: any) {
      this.text = obj ? obj.text : '';
      this.timestamp = obj ? obj.timestamp : new Date().getTime();
      this.userId = obj ? obj.userId : '';
      this.channelId = obj ? obj.channelId : ''
      this.textStyle = obj ? obj.textStyle : '';
      this.imageUrl = obj ? obj.imageUrl : '';
    }
  
    public toJSON(): any {
      return {
        text: this.text,
        timestamp: this.timestamp,
        userId: this.userId,
        channelId: this.channelId,
        textStyle: this.textStyle,
        imageUrl: this.imageUrl,
      }
    }
  }
  