export class Channelmessage {
  message: string;
  timestamp: number;
  userId: string; // is the firebase document ID from the user who sent the message, for example user 3C651LYhk1HaB8Y0Vsbf
  channelId: string; // is the firebase document ID from the channel, in which message was posted, for example channel 8liMczKcm1Paer7sJbAX
  customIdName?: string;
  textStyle: "normal" | "italic" | "bold" | "linethrough" | "code" = 'normal';
  imageUrl?: string;

  constructor(obj?: any) {
    this.message = obj ? obj.message : '';
    this.timestamp = obj ? obj.timestamp : new Date().getTime();
    this.userId = obj ? obj.userId : ''
    this.channelId = obj ? obj.channelId : ''
    this.customIdName = obj ? obj.customIdName : '';
    this.textStyle = obj ? obj.textStyle : '';
    this.imageUrl = obj ? obj.imageUrl : '';
  }

  public toJSON(): any {
    return {
      message: this.message,
      timestamp: this.timestamp,
      userId: this.userId,
      channelId: this.channelId,
      customIdName: this.customIdName,
      textStyle: this.textStyle,
      imageUrl: this.imageUrl,
    }
  }
}
