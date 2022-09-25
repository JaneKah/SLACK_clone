export class User {
    displayName: string;
    email: string;
    img: string; // url to an image
    photoURL: string;
  
    constructor(obj?: any) {
      this.displayName = obj ? obj.displayName : '';
      this.email = obj ? obj.email : '';
      this.img = obj ? obj.img : '';
      this.photoURL = obj ? obj.photoURL : '';
    }
  
    public toJSON(): any {
      return {
        displayName: this.displayName,
        email: this.email,
        img: this.img,
        photoURL: this.photoURL,
      }
    }
  }
  