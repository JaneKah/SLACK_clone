import { User } from "src/app/shared/services/user";

export class Users implements User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  
    constructor(obj?: any) {
      this.displayName = obj ? obj.displayName : '';
      this.email = obj ? obj.email : '';
      this.uid = obj ? obj.uid : '';
      this.photoURL = obj ? obj.photoURL : '';
      this.emailVerified = obj ? obj.emailVerified : '';
    }
  
    public toJSON(): any {
      return {
        displayName: this.displayName,
        email: this.email,
        uid: this.uid,
        photoURL: this.photoURL,
        emailVerified: this.emailVerified,
      }
    }
  }
  